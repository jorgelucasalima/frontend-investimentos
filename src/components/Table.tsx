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

  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filtra os ativos com base no nome digitado
  const filteredAtivos = ativos.filter(ativo =>
    ativo.ticker_ativo.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedAtivos = filteredAtivos.slice(startIdx, startIdx + itemsPerPage);

  return (
    <Container>
      <TableHeadContent>
        <h4>Lista de ativos</h4>
        <Button title="Adicionar Ativo" onClick={openModal} />
      </TableHeadContent>

      {/* Campo de busca */}
      <Filter
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TableContent>
        <tbody>
          {paginatedAtivos.map((ativo) => (
            <TableRow key={ativo.id}>
              <TableData>
                <Avatar
                  size="50"
                  round="50%"
                  title={ativo.ticker_ativo}
                  name={ativo.ticker_ativo}
                  alt={ativo.ticker_ativo}
                />
              </TableData>
              <TableData>{ativo.ticker_ativo}</TableData>
              <TableData>Saldo Atual: <strong>R$ {ativo.cotacao}</strong> </TableData>
              <TableData>Quantidade: <strong>{ativo.quantidade}</strong></TableData>
              <TableData>
                <DropDown
                  openModalCompras={() => {
                    setAtivoId(ativo.id);
                    setTickerAtivo(ativo.ticker_ativo);
                    openModalCompras();
                  }}
                  openModalVenda={() => {
                    setAtivoId(ativo.id);
                    setTickerAtivo(ativo.ticker_ativo);
                    openModalVenda();
                  }}
                  deleteAction={() => handleDeleteAtivo(ativo.id)}
                />
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </TableContent>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredAtivos.length / itemsPerPage)}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        totalItems={filteredAtivos.length}
      />

      <Toaster position="bottom-right" reverseOrder={true} />
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const TableContent = styled.table`
  overflow-x: auto;
  width: 100%;
  border-collapse: collapse;
`;

const TableHeadContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TableRow = styled.tr` 
  background-color: #FAFAFA;
`;

const TableData = styled.td`
  padding: 15px;
  border: none !important;
`;
