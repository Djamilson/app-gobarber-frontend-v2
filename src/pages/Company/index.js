import React, { useState } from 'react';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  name_company: Yup.string().required('O nome da empresa é obrigatório'),
  email_company: Yup.string()
    .email('Insira um e-mail válido')
    .required('Email da empresa é obrigatorio'),
  name: Yup.string().required('O nome do adminstrador é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail do administrador é obrigatório'),
  password: Yup.string()
    .min(1, 'No mínimo 1 caracter')
    .required('A senha é obrigatória'),
});

export default function Company() {

  async function handleSubmit(data, { resetForm }) {
    await api
      .post(`/companies`, { data })
      .then(() => {
               toast.success(`Empresa cadastrado com sucesso!`);
        resetForm();
      })
      .catch(err => {

        const { stack } = err;
        const finall = stack.split('status code ')[1].substring(0, 3);

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
        <span>Cadastrar Empresa</span>
      </Content>
      <Form schema={schema} onSubmit={handleSubmit}>
        <hr />
        <h2> Dados empresa </h2>
        <Input name="name_company" placeholder="Nome da empresa" />
        <Input
          name="email_company"
          type="email"
          placeholder="Email da empresa"
        />

        <hr />

        <h2> Dados do administrador </h2>

        <Input name="name" placeholder="Nome" />
        <Input name="email" type="email" placeholder="Seu email" />
        <Input name="password" type="password" placeholder="Sua Senha" />

        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}
