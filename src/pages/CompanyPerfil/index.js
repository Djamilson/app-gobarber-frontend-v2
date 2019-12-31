import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import {
  FaUniversity,
  FaEnvelope,
  FaUserLock,
  FaUnlockAlt,
} from 'react-icons/fa';

import { toast } from 'react-toastify';
import api from '~/services/api';

import { Container, Content, Logo } from './styles';

const schema = Yup.object().shape({
  id: Yup.string(),
  name: Yup.string().required('O nome da empresa é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('Email da empresa é obrigatorio'),
  cod_company: Yup.string()
    .min(1, 'No mínimo 1 caracter')
    .required('A senha é obrigatória'),
  logo_id: Yup.string(),
});

export default function CompanyPerfil() {
  const cod_company = useSelector(state => state.user.profile.company_id);

  const [company, setCompany] = useState({});

  const [preview, setPreview] = useState();
  const [file, setFile] = useState();

  async function loadSchedule() {
    const response = await api.get(`companyperfil/${cod_company}`);

    setCompany(response.data);

    if (!!response.data.logo) {
      const { id, url } = response.data.logo;

      setFile(id);
      setPreview(url);
    }
  }

  useEffect(() => {
    loadSchedule();
  }, []);

  async function handleChange(e) {
    setPreview(undefined);

    const data = new FormData();
    data.append('file', e.target.files[0]);

    if (!!company.logo) {
      data.append('id_logo', company.logo.id);
      data.append('url_logo', company.logo.url);
      data.append('path_logo', company.logo.path);

      await api.put('files', data).then(d => {
        toast.success(`Logo editado com sucesso!`);
        setFile(d.id);
        setPreview(d.url);
      });
    } else {
      await api.post('files', data).then(async file => {
        const dados = { id_logo: file.data.id, id_company: company.id };

        await api.put('companyfiles', dados).then(() => {
          toast.success(`Logo editado com sucesso!`);
        });
      });
    }

    loadSchedule();
  }

  async function handleSubmit(data) {
    await api
      .put(`/companies`, { data })
      .then(() => {
        //setSuccess(true);

        toast.success(`Empresa editada com sucesso!`);

        loadSchedule();
      })
      .catch(error => {
        const str = error.toString();
        const finall = str.replace(/\D/g, '');

        if (finall === '400') {
          toast.error('Campos inválidos!');
        }

        if (finall === '401') {
          toast.error('Não foi possível fazer o cadastro da empresa!');
        }

        if (finall === '402') {
          toast.error(
            'Não foi possível adicionar o usuário como administrador do sistema!'
          );
        }

        if (finall === '403') {
          toast.error('Não foi possível associar o usuário ao grupo!');
        }
      });
  }

  return (
    <Container>
      <Content>
        <span>Perfil da empresa</span>
      </Content>

      <Logo>
        <label>
          {preview ? (
            <img
              src={
                preview ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt=""
            />
          ) : (
            'Click aqui para selecione sua imagem'
          )}
          <input
            type="file"
            id="avatar"
            accept="image/*"
            data-file={file}
            onChange={handleChange}
          />
        </label>
      </Logo>

      <Form initialData={company} schema={schema} onSubmit={handleSubmit}>
        <hr />
        <h2> Dados da empresa</h2>

        <label>Nome:</label>
        <div>
          <Input name="id" hidden />
          <Input name="name" placeholder="Nome da empresa" />
          <label>
            <FaUniversity size="19" color="#fff" />
          </label>
        </div>
        <label>Email:</label>
        <div>
          <Input name="email" type="email" placeholder="Email da empresa" />{' '}
          <label>
            <FaEnvelope size="19" color="#fff" />
          </label>
        </div>

        <label>Código para criar novos usuários:</label>
        <div>
          <Input name="cod_company" hidden />
          <label>
            <FaUnlockAlt size="22" color="#fff" />
          </label>
          <span>{company.cod_company}</span>
        </div>

        <hr />

        <h2> Dados do administrador </h2>

        <label>Administrador da empresa:</label>
        <div>
          <Input name="users[0].name" disabled placeholder="Nome" />

          <label>
            <FaUserLock size="22" color="#fff" />
          </label>
        </div>

        <button type="submit">Editar</button>
      </Form>
    </Container>
  );
}
