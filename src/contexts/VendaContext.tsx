import React, { createContext, useContext, useState, useEffect } from 'react';
import api from "../services/api";
import toast from 'react-hot-toast';

interface Venda {
  ticker_ativo: number;
  data_venda: string;
  quantidade: number;
}

interface VendaContextProps {
  vendas: Venda[];
  setVendas: React.Dispatch<React.SetStateAction<Venda[]>>;
  handleSubmitVenda: () => Promise<void>;
  modalIsOpenVenda: boolean;
  setIsOpenVenda: React.Dispatch<React.SetStateAction<boolean>>;
  openModalVenda: () => void;
  closeModalVenda: () => void;
}

export const VendaContext = createContext<VendaContextProps>({} as VendaContextProps);

export const VendaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [vendas, setVendas] = useState<Venda[]>([]);
  const [modalIsOpenVenda, setIsOpenVenda] = useState<boolean>(false);

  useEffect(() => {
    const loadVendas = async () => {
      try {
        const response = await api.get("/vendas");
        setVendas(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadVendas();
  }, []);

  const handleSubmitVenda = async () => {
    try {
      const response = await api.post("/vendas");
      setVendas(prevVendas => [...prevVendas, response.data]);
      setIsOpenVenda(false);
      toast.success('Venda realizada com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao realizar a venda!');
    }
  };

  function openModalVenda() {
    setIsOpenVenda(true);
  }

  function closeModalVenda() {
    setIsOpenVenda(false);
  }

  return (
    <VendaContext.Provider
      value={{
        vendas,
        setVendas,
        handleSubmitVenda,
        modalIsOpenVenda,
        setIsOpenVenda,
        openModalVenda,
        closeModalVenda
      }}
    >
      {children}
    </VendaContext.Provider>
  );
}

export const useVenda = () => {
  const context = useContext(VendaContext);
  if (!context) {
    throw new Error("useVenda deve ser usado dentro de VendaProvider");
  }
  return context;
}