import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import {
  FaUniversity,
  FaEnvelope,
  FaUserLock,
  FaUnlockAlt,
} from 'react-icons/fa';

import { MdPhoto } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/_services/api';

import {
  Container,
  Content,
  Avatar,
  ItemAvatar,
  Item,
  ContaineIcon,
} from './styles';
import Loading from '~/components/Loading';
import { colors } from '~/styles';

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
  const idCompany = useSelector(state => state.user.profile.company_id);
  
  const [company, setCompany] = useState({});
  const [image, setImage] = useState({ preview: '', idFile: '' });

  const loading_ = useSelector(state => state.user.loading);

  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const profile = useSelector(state => state.user.profile);
  const [color] = useState(`${colors.serven}`);

  async function loadSchedule() {
    const response = await api.get(`companyperfil/${idCompany}`);

    setCompany(response.data);

    if (!!response.data.logo) {
      const { id, url } = response.data.logo;
      setImage({
        preview: `${url}-sm`,
        idFile: id,
      });
    }
  }

  useEffect(() => {
    loadSchedule();
  }, []);

  async function handleSubmit(data) {
    await api
      .put(`/companies`, { data })
      .then(() => {
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

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    try {
      setLoading(true);
      const { idFile } = image;
      data.append('id', idFile);

      setLoading(true);
      const res = await api.put(`company/update/files/${idCompany}`, data);

      const { _id, url } = res.data;

      setImage({
        preview: `${url}-sm`,
        idFile: _id,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Erro no upload da imagem, tente novamente!');
    }
  }

  return (
    <Container>
      <Content>
        <span>Perfil da empresa</span>
      </Content>
      <Avatar>
        <section>
          <ItemAvatar color={color}>
            <span>
              <label>
                {image.preview ? (
                  <img
                    src={
                      image.preview ||
                      'https://api.adorable.io/avatars/50/abott@adorable.png'
                    }
                    alt={profile.name}
                  />
                ) : (
                  <ContaineIcon>
                    <MdPhoto size={40} color={colors.serven} />
                    Adicionar foto
                  </ContaineIcon>
                )}

                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleChange}
                  ref={inputRef}
                />
              </label>
            </span>
          </ItemAvatar>
        </section>
        <Item>{(loading_ === true || loading === true) && <Loading />}</Item>
      </Avatar>

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
          <h3>{company.cod_company}</h3>
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
