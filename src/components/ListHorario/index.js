import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import Modal from '~/components/Modal';

import { Container, Content, Time } from './styles';

import api from '~/_services/api';

export default function ListHorario({ horarioSize, horario, loadHorario }) {
  const [show, setShow] = useState(false);
  const [nameDelete, setNameDelete] = useState();
  const [idParaDelete, setIdParaDelete] = useState();
  const [nomeButton] = useState('Deletar');

  function showModal() {
    setShow(!show);
  }

  async function handleDelete(id) {
    await api
      .put(`horarios/${id}`)
      .then(() => {
        loadHorario();
        toast.success(`Horário deletado com sucesso!`);
      })
      .catch(err => {
        const { stack } = err;
        const finall = stack.split('status code ')[1].substring(0, 3);

        if (finall === '400') {
          toast.error(
            'Não foi possível remover esse horário, tente novamente!'
          );
        }
      });
    showModal();
  }

  function handleChamaDelete(tempo) {
    const { id } = tempo;

    setIdParaDelete(id);
    showModal();
    setNameDelete(tempo);
  }

  return (
    <Container>
      <Content>
        <h2>Total de {horarioSize} horários na lista </h2>
      </Content>
      <hr />
      <ul>
        {horario.map(time => (
          <Time key={time.id}>
            <strong>{time.time}</strong>

            <button type="button" onClick={() => handleChamaDelete(time)}>
              <MdDelete size={28} color="#7159c1" />
            </button>
          </Time>
        ))}
      </ul>
      <Modal
        onClose={showModal}
        show={show}
        nameDelete={nameDelete}
        onDelete={() => handleDelete(idParaDelete)}
        nomeButton={nomeButton}
      >
        Tem certeza que deseja deletar esse horário?
      </Modal>
    </Container>
  );
}

ListHorario.propTypes = {
  horarioSize: PropTypes.number.isRequired,
  horario: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      time: PropTypes.string,
    })
  ).isRequired,

  loadHorario: PropTypes.func.isRequired,
};

ListHorario.defaultProps = {
  horario: [],
};
