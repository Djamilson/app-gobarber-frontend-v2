import React, { useState, useEffect, useMemo } from 'react';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Form } from '@rocketseat/unform';

import api from '~/_services/api';

import Times from '~/components/Times';
import ListHorario from '~/components/ListHorario';

import Loading from '~/components/Loading1';

import { Container } from './styles';

const schema = Yup.object().shape({
  hora: Yup.number().required('Somente horas'),
  min: Yup.number().required('Somente minutos'),
});

export default function Horario() {
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [horario, setHorario] = useState([]);

  async function loadHorario() {
    setLoading(true);
    const range = await api.get('horarios');

    const data = range.data.map(hora => {
      const [hour, minute] = hora.horario.split(':');

      const h = hour < 10 ? `0${hour}h` : `${hour}h`;
      const m = minute < 10 ? `0${minute}min` : `${minute}min`;
      const { id } = hora;

      return {
        id,
        time: `${h}:${m}`,
      };
    });

    setHorario(data);
    setLoading(false);
  }

  useEffect(() => {
    loadHorario();
  }, []);

  const horarioSize = useMemo(() => horario.length, [horario]);

  async function handleSubmit(data) {
    setLoadingSubmit(true);
    try {
      await api.post(`horarios`, { data });
      setLoadingSubmit(false);
      toast.success(`Horário cadastrado com sucesso!`);
      loadHorario();
    } catch (err) {
      setLoadingSubmit(false);
      const { stack } = err;
      const finall = stack.split('status code ')[1].substring(0, 3);

      if (finall === '400') {
        toast.error('Esse horário já está cadastrado!');
      }
    }
  }

  return (
    <Container>
      <Loading isActive={loading} />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Times />
        <hr />
        <button type="submit">
          {loadingSubmit ? 'Salvando ...' : 'Salvar'}
        </button>
      </Form>
      <ListHorario
        horarioSize={horarioSize}
        horario={horario}
        loadHorario={() => loadHorario()}
      />
    </Container>
  );
}
