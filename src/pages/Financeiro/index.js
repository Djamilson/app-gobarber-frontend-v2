import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form } from '@rocketseat/unform';
import { format, subMonths, addMonths } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import NumberFormat from 'react-number-format';

import { FaDollarSign } from 'react-icons/fa';

import { toast } from 'react-toastify';

import 'react-day-picker/lib/style.css';

import FileList from '~/components/FileList';
import Modal from '~/components/Modal';
import api from '~/services/api';

import Loading from '~/components/Loading';

import { Container, Content, Logo, ValorInput } from './styles';
import { ContatinerLoding } from '~/styles/components';

export default function Financeiro() {
  const [loading, setLoading] = useState(false);

  const [nomeButton, setNomeButton] = useState();
  const [show, setShow] = useState(false);

  const [nameDelete, setNameDelete] = useState();
  const [idParaDelete, setIdParaDelete] = useState();

  const [price, setPrice] = useState();

  const company = useSelector(state => state.user.profile);
  const [listFinance, setListFinance] = useState([]);

  const [preview, setPreview] = useState();
  const [file, setFile] = useState();

  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  async function loadFinance() {
    setLoading(true);
    const response = await api.get(`finances/${company.company_id}`);

    const data = response.data.map(parcela => {
      const {
        id,
        price: pri,
        date: datee,
        createdAt: createdAtt,
        avatar,
      } = parcela;

      const dataSemFormatar = createdAtt;
      const d = format(new Date(datee), "MMM'/'yyyy", { locale: pt });
      const createdAt = format(new Date(createdAtt), "dd'/'MM'/'yyyy", {
        locale: pt,
      });

      if (pri !== null) {
        const string = parseFloat(pri.toFixed(2));
        const fixLength = (+string).toString().replace('.', ',');
        const [real, centavos] = fixLength.split(',');

        const ultimo = real.substring(real.length - 3, real.length);
        const penultimo = real.substring(real.length - 6, real.length - 3);
        const primeiro = real.substring(real.length - 9, real.length - 6);
        const resto = real.substring(real.length - 12, real.length - 9);

        const novaString = formatarNumero(
          real,
          primeiro,
          penultimo,
          ultimo,
          resto
        );

        const formatMoeda =
          centavos !== undefined && centavos.length < 2
            ? `${centavos}0`
            : centavos;
        const pricefinal =
          formatMoeda === undefined
            ? `R$ ${novaString},00 `
            : `R$ ${novaString},${formatMoeda} `;

        return {
          id,
          date: d,
          createdAt,
          dataSemFormatar,
          price: pricefinal,
          avatar,
        };
      }
      return parcela;
    });
    setListFinance(data);

    setLoading(false);
  }

  function formatarNumero(real, primeiro, penultimo, ultimo, resto) {
    if (real.length > 9 && real.length < 13) {
      return `${resto}.${primeiro}.${penultimo}.${ultimo}`;
    }

    if (real.length > 6 && real.length < 10) {
      return `${primeiro}.${penultimo}.${ultimo}`;
    }

    if (real.length > 3 && real.length < 7) {
      return `${penultimo}.${ultimo}`;
    }

    if (real.length > 0 && real.length < 4) {
      return ultimo;
    }
    return real;
  }

  const [filePegou, setFilePegou] = useState();

  async function handleChange(e) {
    setLoading(true);
    const file = e.target.files[0];
    setFilePegou(file);

    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setLoading(false);
    // free memory when ever this component is unmounted
    ///URL.revokeObjectURL(objectUrl);
  }

  async function handleSubmit(data_, { resetForm }) {
    const priceFloat = price
      .replace('R$ ', '')
      .replace(/\./g, '')
      .replace(',', '.');

    const { company_id } = company;

    const dataa = new FormData();
    dataa.append('file', filePegou);
    dataa.append('date', date);
    dataa.append('priceFloat', priceFloat);
    dataa.append('company_id', company_id);

    await api
      .post(`/finances`, dataa)
      .then(() => {
        loadFinance();
        toast.success(`Pagamento cadastrado com sucesso!`);

        setPrice('');
        resetForm();
        setPreview(null);
      })
      .catch(err => {
        const { stack } = err;

        const finall = stack.split('status code ')[1].substring(0, 3);

        if (finall === '400') {
          toast.error(
            'Não foi possível cadastrar o pagamento, tente novamente!'
          );
        }
        setPrice('');
        resetForm();
        setPreview(null);
      });
  }

  useEffect(() => {
    loadFinance();
  }, []);

  function handleChamaDelete(tempo) {
    setLoading(true);
    const { id } = tempo;

    setIdParaDelete(id);
    showModal();
    setNomeButton('Delete');

    setNameDelete({ time: tempo.date });
    setLoading(false);
  }

  async function handleDelete(id) {
    setLoading(true);
    await api
      .delete(`finances/${id}`)
      .then(() => {
        loadFinance();
        setLoading(false);
        toast.success(`Comprovante removido com sucesso!`);
      })
      .catch(err => {
        setLoading(false);
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

  function showModal() {
    setShow(!show);
  }

  function handlePrevDay() {
    setDate(subMonths(date, 1));
  }

  function handleNextDay() {
    setDate(addMonths(date, 1));
  }

  function handleOnChange(e) {
    e.persist();
    setPrice(e.target.value);
  }

  return loading ? (
    <ContatinerLoding  loading={loading.toString()}>
        <Loading />
      </ContatinerLoding>
  ) : (
    <Container>
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
             'Click aqui para selecione o comprovante de pagamento'
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
       <Form onSubmit={handleSubmit}>
         <label>Mês do pagamento:</label>
         <div>
           <button type="button" onClick={handlePrevDay}>
             <MdChevronLeft size={36} color="#FFF" />
           </button>
           <strong>{dateFormatted}</strong>
           <button type="button" onClick={handleNextDay}>
             <MdChevronRight size={36} color="#FFF" />
           </button>
         </div>

         <label>Valor do comprovante de pagamento:</label>
         <ValorInput>
           <NumberFormat
             placeholder="Valor do comprovante de pagamento R$"
             thousandSeparator="."
             decimalSeparator=","
             allowNegative={false}
             prefix="R$ "
             decimalScale={2}
             fixedDecimalScale
             onChange={e => handleOnChange(e)}
           />{' '}
           <label>
             <FaDollarSign size="19" color="#fff" />
           </label>
         </ValorInput>

         <hr />
         <button type="submit">Salvar comprovante</button>
       </Form>

       <Content>
         <h2>Mensalidades da Empresa </h2>
         <hr />

         {!!listFinance && (
           <FileList
             handleChamaDelete={handleChamaDelete}
             files={listFinance}
             onDelete={handleDelete}
             onClose={showModal}
             show={show}
           />
         )}

         <Modal
           onClose={showModal}
           show={show}
           nameDelete={nameDelete}
           onDelete={() => handleDelete(idParaDelete)}
           nomeButton={nomeButton}
         >
           Tem certeza que deseja deletar esse comprovante?
         </Modal>
       </Content>
     </Container>
  );
}
