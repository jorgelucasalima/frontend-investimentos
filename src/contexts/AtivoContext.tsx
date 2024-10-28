import React, { createContext, useContext, useState, useEffect } from 'react';
import api from "../services/api";
import toast from 'react-hot-toast';

interface Ativo {
  ticker_ativo: string;
  data_compra: string;
  quantidade: number;
  cotacao: number;
  tipo: string;
}

interface AtivoContextProps {
  ativos: Ativo[];
  setAtivos: React.Dispatch<React.SetStateAction<Ativo[]>>;
  handleSubmitAtivo: (novoAtivo: Ativo) => Promise<void>;
  handleDeleteAtivo: (id: number) => Promise<void>;
  modalIsOpenAtivo: boolean;
  setIsOpenAtivo: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: () => void;
  closeModal: () => void;
}

const AtivoContext = createContext<AtivoContextProps | undefined>(undefined);

export const AtivoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ativos, setAtivos] = useState<Ativo[]>([]);
  const [modalIsOpenAtivo, setIsOpenAtivo] = useState<boolean>(false);

  useEffect(() => {
    async function getAtivos() {
      try {
        const response = await api.get("/ativos");
        setAtivos(response.data);
      } catch (error) {
        console.error("Erro ao obter os ativos:", error);
      }
    }
    getAtivos();
  }, []);

  const handleSubmitAtivo = async (novoAtivo: Ativo) => {
    try {
      const response = await api.post("/ativos", novoAtivo);
      setAtivos(prevAtivos => [...prevAtivos, response.data]);

      closeModal();

      toast.success('Ativo adicionado com sucesso!');
    } catch (error) {
      console.error("Erro ao adicionar o ativo:", error);
      toast.error('Erro ao adicionar o ativo!');
    }
  };

  const handleDeleteAtivo = async (id: number) => {
    try {
      await api.delete(`/ativos/${id}`);
      setAtivos(prevAtivos => prevAtivos.filter(ativo => ativo.id !== id));

      toast.success('Ativo excluído com sucesso!');
    } catch (error) {
      console.error("Erro ao excluir o ativo:", error);
      toast.error('Você não pode excluir o ativo, existem compras ou vendas !');
    }
  };

  function openModal() {
    setIsOpenAtivo(true);
  }

  function closeModal() {
    setIsOpenAtivo(false);
  }

  return (
    <AtivoContext.Provider value={{ ativos, setAtivos, handleSubmitAtivo, handleDeleteAtivo, openModal, modalIsOpenAtivo, closeModal}}>
      {children}
    </AtivoContext.Provider>
  );
};

export const useAtivo = () => {
  const context = useContext(AtivoContext);
  if (!context) {
    throw new Error("useAtivo deve ser usado dentro de um AtivoProvider");
  }
  return context;
};
