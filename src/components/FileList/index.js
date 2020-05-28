import React from 'react';

import {
  MdCheckCircle,
  MdError,
  MdLink,
  MdFileDownload,
  MdDelete,
} from 'react-icons/md';

import { formatDistance } from 'date-fns';

import pt from 'date-fns/locale/pt';

import {
  ContainerList,
  HeaderFileInfoPreview,
  HeaderFileInDataPg,
  HeaderFileInfoMesRef,
  HeaderFileInfoValor,
  HeaderFileInfoMesAcao,
  FileInfoPg,
  FileInfoMesRef,
  FileInfoValor,
  FileInfoAcao,
  Preview,
  FileHeader,
} from './styles';

export default function FileList({ files, handleChamaDelete }) {
  function getAvatar(avatar) {
    if (avatar) return `${avatar.url}-xs`;

    return 'https://api.adorable.io/avatars/50/abott@adorable.png';
  }

  return (
    <ContainerList>
      <FileHeader>
        <HeaderFileInfoPreview>#</HeaderFileInfoPreview>
        <HeaderFileInDataPg>Data pagamento</HeaderFileInDataPg>
        <HeaderFileInfoMesRef>Mês referente</HeaderFileInfoMesRef>
        <HeaderFileInfoValor>Valor R$ Pago</HeaderFileInfoValor>
        <HeaderFileInfoMesAcao>Ação</HeaderFileInfoMesAcao>
      </FileHeader>

      {files.map(uploadedFile => (
        <li key={uploadedFile.id}>
          <Preview src={getAvatar(uploadedFile.avatar)} />
          <FileInfoPg>
            <div>
              <strong>{uploadedFile.createdAt}</strong>
              <span>
                há{' '}
                {formatDistance(
                  new Date(uploadedFile.dataSemFormatar),
                  new Date(),
                  { locale: pt }
                )}
              </span>
            </div>
          </FileInfoPg>
          <FileInfoMesRef>
            <div>
              <strong>{uploadedFile.date}</strong>
            </div>
          </FileInfoMesRef>
          <FileInfoValor>
            <div>
              <span>{uploadedFile.price}</span>
            </div>
          </FileInfoValor>
          <FileInfoAcao>
            <div>
              {uploadedFile.uploaded && (
                <MdCheckCircle size={24} color="#78e5d5" />
              )}
              {uploadedFile.error && <MdError size={24} color="#e57878" />}
              {uploadedFile.avatar !== null ? (
                <>
                  <a
                    download={`${uploadedFile.avatar.path}-original`}
                    href={`${uploadedFile.avatar.url}-xs`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MdFileDownload
                      style={{ marginRight: 8 }}
                      size={24}
                      color="#222"
                    />
                  </a>

                  <a
                    href={`${uploadedFile.avatar.url}-xs`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                  </a>
                </>
              ) : (
                ''
              )}
              <button
                type="button"
                onClick={() => handleChamaDelete(uploadedFile)}
              >
                <MdDelete size={28} color="#7159c1" />
              </button>
            </div>
          </FileInfoAcao>
        </li>
      ))}
    </ContainerList>
  );
}
