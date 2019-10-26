import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import { MdInfoOutline } from 'react-icons/md';

import Checkbox from '../Checkbox';
import api from '~/services/api';

import { Modall, ContentModal, Actions, Front } from './styles';

export default function ModalPerfil({
  children,
  onClose,
  show,
  checkboxFields,
  loadSchedule,
}) {
  const [items, setItems] = useState([]);

  function checkboxHandler(e) {
    const { name, checked } = e.target;

    setItems(
      checkboxFields.map(p => {
        if (name === p.name) {
          console.log('Checked: ', checked);

          const g = {
            id: p.id,
            name: p.name,
            description: p.description,
            checked,
            user_id: p.user_id,
            admin_master: p.admin_master,
          };

          return g;
        }
        return { ...p };
      })
    );
  }

  async function handleEditPerfil() {
    console.log('Agora vai minha lista para o banco: ', items);

    if (items.length < 1) {
      toast.warn(`Você não editou o perfil do usuário!`);
    } else {
      const item = items.filter(it => it.checked === true);

      if (item && item.length > 0) {

        await api
          .put(`/groups/users/edit`, {
            listGroup: items,
          })
          .then(() => {
            loadSchedule();
            toast.success(`Usuário editado com sucesso!`);
          })
          .catch(err => {
            const { stack } = err;
            const finall = stack.split('status code ')[1].substring(0, 3);

            if (finall === '400') {
              toast.error(
                'Não foi possível alterar o usuário, tente novamente!'
              );
            }

            if (finall === '401') {
              toast.error(
                'Esse usuário não pode ser desabilitado, pois é o usuário Master do Sistema!'
              );
            }
          });
      } else {
        toast.error('O usuário não pode ficar sem perfil!');
      }
    }
    onClose();
  }

  return (
    show && (
      <Front>
        <Modall id="modal">
          <Actions>
            <h3>Editar perfil!</h3>
          </Actions>

          <ContentModal>
            <MdInfoOutline style={{ marginRight: 24 }} size={30} color="#222" />
            {children}
            <Table>
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Nome</Th>
                  <Th>Ação</Th>
                </Tr>
              </Thead>
              <Tbody>
                {checkboxFields.map(
                  ({ id, name, description, checked, admin_master }, ind) => (
                    <Tr key={id}>
                      <Td>{1 + ind}</Td>
                      <Td>{description}</Td>
                      <Td>
                        <Checkbox
                          type="checkbox"
                          name={name}
                          value={checked}
                          onChange={checkboxHandler}
                          disabled={admin_master}
                        />
                      </Td>
                    </Tr>
                  )
                )}
              </Tbody>
            </Table>
          </ContentModal>
          <Actions>
            <button type="button" className="toggle-button" onClick={onClose}>
              Cancelar{' '}
            </button>
            <button
              type="button"
              className="toggle-button"
              onClick={() => handleEditPerfil()}
            >
              Salvar{' '}
            </button>
          </Actions>
        </Modall>
      </Front>
    )
  );
}

ModalPerfil.propTypes = {
  children: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};
