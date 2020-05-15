import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import Modal from '~/components/Modal';
import ModalPerfil from '~/components/ModalPerfil';

import api from '~/_services/api';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import { Container, Content } from './styles';

export default function CadUser() {
  const [listUser, setListUser] = useState([]);
  const { company_id } = useSelector(state => state.user.profile);

  const [nomeButton, setNomeButton] = useState();
  const [show, setShow] = useState(false);
  const [showPerfil, setShowPerfil] = useState(false);

  const [nameDelete, setNameDelete] = useState();
  const [userAction, setUserAction] = useState();
  const [userSelect, setUserSelect] = useState([]);

  async function loadSchedule() {
    const response = await api.get(`companies/user/${company_id}`);
    setListUser(response.data);
  }

  useEffect(() => {
    loadSchedule();
  }, []);

  async function handleDesabled(id) {
    await api
      .put(`/companies/user/${id}`)
      .then(() => {
        loadSchedule();
        toast.success(`Usuário editado com sucesso!`);
      })
      .catch(error => {
        const str = error.toString();
        const finall = str.replace(/\D/g, '');

        if (finall === '400') {
          toast.error('Não foi possível alterar o usuário, tente novamente!');
        }

        if (finall === '401') {
          toast.error(
            'Esse usuário não pode ser desabilitado, pois é o usuário Master do Sistema!'
          );
        }
      });
    showModal();
  }

  function showModal() {
    setShow(!show);
  }

  function showModalPerfil() {
    setShowPerfil(!showPerfil);
  }

  function handleChamaDelete(user) {
    const { id } = user;

    setUserAction(id);
    showModal();
    setNameDelete(user.name);
    setNomeButton(user.status === true ? 'desativa' : 'ativar');
  }

  function handleBoolean(user) {
    return Boolean(user.admin_master);
  }

  async function handleChamaPerfil(user) {
    const { data } = await api.get('groups');

    const checkboxFields = data.map(e1 => {
      for (const k of user.group_users.values()) {
        if (e1.description === k.Group.description) {
          return {
            ...e1,
            checked: true,
            user_id: user.id,
            admin_master: user.admin_master,
          };
        }
      }

      return {
        ...e1,
        checked: false,
        user_id: user.id,
        admin_master: user.admin_master,
      };
    });

    setUserSelect(checkboxFields);
    showModalPerfil();
    setNameDelete(user.name);
    setNomeButton(user.status === true ? 'desativa' : 'ativar');
  }

  return (
    <Container>
      <Content>
        <h2>Usuários da Empresa </h2>
        <hr />
      </Content>
      <Table>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Nome</Th>
            <Th>Perfil</Th>
            <Th>Status</Th>
            <Th>Ação</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listUser.map((user, ind) => (
            <Tr key={user.id}>
              <Td>{1 + ind}</Td>
              <Td>
                {user.name} {user.admin_master === true ? '[Master]' : ''}
              </Td>
              <Td>
                {user.group_users.map(group => (
                  <span key={group.id}>
                    {group.Group.description} {''}{' '}
                  </span>
                ))}
              </Td>

              <Td>{user.status === true ? 'Ativo' : 'Desativado'}</Td>
              <Td>
                <button
                  type="button"
                  visible={user.status.toString()}
                  disabled={handleBoolean(user)}
                  onClick={() => handleChamaDelete(user)}
                >
                  {' '}
                  {user.status === true ? 'Desativa' : 'Ativar'}{' '}
                </button>{' '}
                <button type="button" onClick={() => handleChamaPerfil(user)}>
                  Perfil
                </button>{' '}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal
        onClose={showModal}
        show={show}
        nameDelete={nameDelete}
        onDelete={() => handleDesabled(userAction)}
        nomeButton={nomeButton}
      >
        Tem certeza que deseja {nomeButton} esse usuário?
      </Modal>

      <ModalPerfil
        onClose={showModalPerfil}
        show={showPerfil}
        nomeButton={nomeButton}
        checkboxFields={userSelect}
        loadSchedule={() => loadSchedule()}
      >
        Alterando as permissões de acesso do usuário:
      </ModalPerfil>
    </Container>
  );
}
