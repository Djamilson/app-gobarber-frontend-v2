import React from 'react';
import {
  MdDelete,
  MdLink,
  MdFileDownload,
} from 'react-icons/md';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import { Scroll } from './styles';

export default function Tabela({ listFinance, handleChamaDelete }) {
  console.log('Lista: ', listFinance);
  return (
    <Table>
      <Scroll>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Mês referente</Th>
            <Th>Valor R$</Th>
            <Th>Data baixa</Th>
            <Th>Ação</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listFinance.map((fin, ind) => (
            <Tr key={fin.id}>
              <Td>{1 + ind}</Td>
              <Td>{fin.date} </Td>
              <Td>{fin.price} </Td>
              <Td>{fin.createdAt} </Td>
              <Td>
                <a
                  download={fin.avatar.path}
                  href={fin.avatar.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdFileDownload
                    style={{ marginRight: 8 }}
                    size={24}
                    color="#222"
                  />
                </a>

                <a href={fin.avatar.url} target="_blank" rel="noopener noreferrer">
                  <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                </a>

                <button type="button" onClick={() => handleChamaDelete(fin)}>
                  <MdDelete size={28} color="#7159c1" />
                </button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Scroll>
    </Table>
  );
}
