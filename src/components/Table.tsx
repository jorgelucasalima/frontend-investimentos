import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import api from "../services/api";
import { useAtivo } from "../contexts/AtivoContext";

import styled from "styled-components";
import Avatar from 'react-avatar';
import Button from "./Button";
import Filter from "./Filter";
import ModalForm from "./ModalForm";
import InputForm from "./InputForm";
import SelectForm from "./SelectForm";
import DropDown from "./DropDown";
import Pagination from "./Pagination";



export default function Table() {

  const [modalIsOpenCompras, setIsOpenCompras] = useState<boolean>(false);
  const [modalIsOpenVenda, setIsOpenVenda] = useState<boolean>(false);

  const { ativos, setAtivos, handleSubmitAtivo, handleDeleteAtivo, openModal, modalIsOpenAtivo, closeModal } = useAtivo();

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Número de itens por página


  const [ativoId, setAtivoId] = useState<number>();
  const [tickerAtivo, setTickerAtivo] = useState<string>("");
  const [dataAtivo, setDataAtivo] = useState<string>("");
  const [quantidadeAtivo, setQuantidadeAtivo] = useState<number>();
  const [cotacaoAtivo, setCotacaoAtivo] = useState<number>();
  const [tipoAtivo, setTipoAtivo] = useState<string>("");


  const [dataCompra, setDataCompra] = useState<string>("");
  const [quantidadeCompra, setQuantidadeCompra] = useState<number>();
  const [cotacaoCompra, setCotacaoCompra] = useState<number>();


  const [dataVenda, setDataVenda] = useState<string>("");
  const [quantidadeVenda, setQuantidadeVenda] = useState<number>();



  function openModalCompras() {
    setIsOpenCompras(true);
  }

  function closeModalCompras() {
    setIsOpenCompras(false);
  }

  function openModalVenda() {
    setIsOpenVenda(true);
  }

  function closeModalVenda() {
    setIsOpenVenda(false);
  }

  const formattedDataAtivo = dataAtivo ? new Date(dataAtivo).toISOString().split('T')[0] : '';


  const ativoData = {
    ticker_ativo: tickerAtivo,
    data_compra: formattedDataAtivo,
    quantidade: quantidadeAtivo,
    cotacao: cotacaoAtivo,
    tipo: tipoAtivo,
  };


  async function handleSubmitCompras() {

    const formattedDataCompra = new Date(dataCompra).toISOString().split('T')[0];

    const compraData = {
      ticker_ativo: ativoId,
      data_compra: formattedDataCompra,
      quantidade: quantidadeCompra,
      cotacao: cotacaoCompra,
    };

    try {
      const response = await api.post("/compras", compraData);
      console.log("Ativo adicionado com sucesso:", response.data);
      // Fechar o modal após o envio

      // Atualiza o ativo correspondente com a nova compra
      setAtivos(prevAtivos =>
        prevAtivos.map(ativo =>
          ativo.id === ativoId
            ? { ...ativo, quantidade: ativo.quantidade + quantidadeCompra }
            : ativo
        )
      );

      closeModalCompras();
    } catch (error) {
      console.error("Erro ao adicionar o ativo:", error);
      toast.error('Erro ao adicionar o ativo!');
      if (error.response) {
        console.error("Dados da resposta:", error.response.data);
      }
    }
  }

  async function handleSubmitVenda() {

    const formattedDataVenda = new Date(dataVenda).toISOString().split('T')[0];

    const vendaData = {
      ticker_ativo: ativoId,
      data_venda: formattedDataVenda,
      quantidade: quantidadeVenda,
    };

    try {
      const response = await api.post("/vendas", vendaData);
      console.log("Ativo adicionado com sucesso:", response.data);
      // Fechar o modal após o envio

      // Atualiza o ativo correspondente com a quantidade ajustada
      setAtivos(prevAtivos =>
        prevAtivos.map(ativo =>
          ativo.id === ativoId
            ? { ...ativo, quantidade: ativo.quantidade - quantidadeVenda }
            : ativo
        )
      );

      toast.success('Venda realizada com sucesso!');

      closeModalVenda();
    } catch (error) {
      console.error("Erro ao adicionar o ativo:", error);
      toast.error('Erro ao realizar a venda!');
      if (error.response) {
        console.error("Dados da resposta:", error.response.data);
      }
    }

  }

  // Função de exclusão de ativo
  // async function handleDeleteAtivo(id: number) {
  //   try {
  //     await api.delete(`/ativos/${id}`);
  //     console.log("Ativo excluído com sucesso");

  //     // Atualiza a lista de ativos após a exclusão
  //     setAtivos(prevAtivos => prevAtivos.filter(ativo => ativo.id !== id));
  //     toast.success('Ativo excluído com sucesso!');
  //   } catch (error) {
  //     console.error("Erro ao excluir o ativo:", error);
  //     toast.error('Você não pode excluir esse ativo.');
  //   }
  // }

  const handlePageChange = (page, newItemsPerPage) => {
    if (newItemsPerPage) {
      setItemsPerPage(newItemsPerPage);
    }
    setCurrentPage(page);
  };

  useEffect(() => {
    async function getAtivos() {
      try {
        const response = await api.get("/ativos");
        setAtivos(response.data); // Armazena os dados dos ativos no estado
      } catch (error) {
        console.error("Erro ao obter os ativos:", error);
      }
    }

    getAtivos(); // Chama a função quando o componente for montado
  }, []);


  const descriptionFooterModalAtivo = quantidadeAtivo * cotacaoAtivo
  const descriptionFooterModalCompras = quantidadeCompra * cotacaoCompra


  return (
    <Container>
      <TableHeadContent>
        <h4>Lista de ativos</h4>
        <Button
          title="Adicionar Ativo"
          onClick={openModal}
        />
      </TableHeadContent>

      {/* Form do cadastro de Ativos */}
      <ModalForm
        modalIsOpen={modalIsOpenAtivo}
        closeModal={closeModal}
        title="Ativo"
        descriptionFooterModal={descriptionFooterModalAtivo}
        action={() => handleSubmitAtivo(ativoData)}
      >
        <InputForm
          type="text"
          placeholder="Ticker do ativo"
          value={tickerAtivo}
          onChange={(e) => setTickerAtivo(e.target.value)}
          bold={true}
        />
        <InputForm
          type="date"
          placeholder="Data de compra"
          value={dataAtivo}
          onChange={(e) => setDataAtivo(e.target.value)}
          bold={true}
        />
        <InputForm
          type="number"
          placeholder="Quantidade"
          value={quantidadeAtivo}
          onChange={(e) => setQuantidadeAtivo(Number(e.target.value))}
          bold={true}
        />
        <InputForm
          type="number"
          placeholder="Cotação"
          value={cotacaoAtivo}
          onChange={(e) => setCotacaoAtivo(Number(e.target.value))}
          bold={true}
        />
        <SelectForm
          options={[
            { label: "Ação", value: "AC" },
            { label: "Fundo Imobiliário", value: "FI" },
            { label: "Renda Fixa", value: "RF" },
            { label: "Criptomoeda", value: "CR" },
          ]}
          value={tipoAtivo}
          onChange={(e) => setTipoAtivo(e.target.value)}
          bold={true}
        />
      </ModalForm>

      <Filter />

      <TableContent>
        <tbody>
          {ativos.map((ativo, index) => (
            <TableRow key={ativo.id}>
              <TableData>
                <Avatar
                  size="50"
                  round="50%"
                  title={ativo.tipoAtivo}
                  name={ativo.ticker_ativo}
                  alt={ativo.tipoAtivo}
                />
              </TableData> {/* Exibe o número da linha */}
              <TableData>{ativo.ticker_ativo}</TableData> {/* Exibe o ticker */}
              <TableData>Saldo Atual: <strong>R$ {ativo.cotacao}</strong> </TableData> {/* Exibe a cotação */}
              <TableData>Quantidade: <strong>{ativo.quantidade}</strong></TableData> {/* Exibe a quantidade */}

              <TableData>
                <DropDown
                  openModalCompras={
                    () => {
                      setAtivoId(ativo.id);  // Guarda o ID
                      setTickerAtivo(ativo.ticker_ativo);  // Guarda o ticker para exibição
                      openModalCompras();
                    }
                  }
                  openModalVenda={
                    () => {
                      setAtivoId(ativo.id);  // Guarda o ID
                      setTickerAtivo(ativo.ticker_ativo);  // Guarda o ticker para exibição
                      openModalVenda();
                    }
                  }
                  deleteAction={
                    () => handleDeleteAtivo(ativo.id)
                  }
                />
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </TableContent>

      {/* Form do cadastro de Compras */}
      <ModalForm
        modalIsOpen={modalIsOpenCompras}
        closeModal={closeModalCompras}
        title="Compra"
        descriptionFooterModal={descriptionFooterModalCompras}
        action={handleSubmitCompras}
      >
        <InputForm
          type="text"
          placeholder="Ticker do ativo"
          value={tickerAtivo}
          disabled={true}
          bold={true}
        />
        <InputForm
          type="date"
          placeholder="Data da compra"
          value={dataCompra}
          onChange={(e) => setDataCompra(e.target.value)}
          bold={true}
        />
        <InputForm
          type="number"
          placeholder="Quantidade"
          value={quantidadeCompra}
          onChange={(e) => setQuantidadeCompra(Number(e.target.value))}
          bold={true}
        />
        <InputForm
          type="number"
          placeholder="Cotação"
          value={cotacaoCompra}
          onChange={(e) => setCotacaoCompra(Number(e.target.value))}
          bold={true}
        />
      </ModalForm>

      <ModalForm
        modalIsOpen={modalIsOpenVenda}
        closeModal={closeModalVenda}
        title="Venda"
        descriptionFooterModal=""
        action={handleSubmitVenda}
      >
        <InputForm
          type="text"
          placeholder="Ticker do ativo"
          value={tickerAtivo}
          disabled={true}
          bold={true}
        />
        <InputForm
          type="date"
          placeholder="Data da venda"
          value={dataVenda}
          onChange={(e) => setDataVenda(e.target.value)}
          bold={true}
        />
        <InputForm
          type="number"
          placeholder="Quantidade"
          value={quantidadeVenda}
          onChange={(e) => setQuantidadeVenda(Number(e.target.value))}
          bold={true}
        />
      </ModalForm>

       {/* Controles de Paginação */}
       <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(ativos.length / itemsPerPage)}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={ativos.length}
       />

      <Toaster
        position="bottom-right"
        reverseOrder={true}
      />
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`

const TableContent = styled.table`
  overflow-x: auto; /* Permite rolagem horizontal */
  width: 100%;
  border-collapse: collapse;
`

const TableHeadContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TableRow = styled.tr` 
  background-color: #FAFAFA;
  margin-bottom: 15px;  /* Adiciona a margem inferior */
  display: block;  /* Torna o tr um bloco para aplicar a margem */
  border-radius: 10px;
`

const TableData = styled.td`
  padding: 15px;
  border: none !important;
`

