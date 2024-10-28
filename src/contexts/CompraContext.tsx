import React, { createContext, useContext, useState, useEffect } from 'react';
import api from "../services/api";
import toast from 'react-hot-toast';

interface Compra {
  ticker_ativo: number;
  data_compra: string;
  quantidade: number;
  cotacao: number;
}

interface CompraContextProps {
  compras: Compra[];
  setCompras: React.Dispatch<React.SetStateAction<Compra[]>>;
  handleSubmitCompras: () => Promise<void>;
  modalIsOpenCompras: boolean;
  setIsOpenCompras: React.Dispatch<React.SetStateAction<boolean>>;
  openModalCompras: () => void;
  closeModalCompras: () => void;
}

const CompraContext = createContext<CompraContextProps>({} as CompraContextProps);

export const CompraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [compras, setCompras] = useState<Compra[]>([]);
  const [modalIsOpenCompras, setIsOpenCompras] = useState<boolean>(false);

  useEffect(() => {
    const loadCompras = async () => {
      try {
        const response = await api.get("/compras");
        setCompras(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadCompras();
  }, [ ]);

  const handleSubmitCompras = async () => {
    try {
      const response = await api.post("/compras");
      setCompras(prevCompras => [...prevCompras, response.data]);
      setIsOpenCompras(false);
      toast.success('Compra adicionada com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao adicionar a compra!');
    }
  };

  function openModalCompras() {
    setIsOpenCompras(true);
  }

  function closeModalCompras(){
    setIsOpenCompras(false)
  }

  return (
    <CompraContext.Provider value={{
      compras,
      setCompras,
      handleSubmitCompras,
      modalIsOpenCompras,
      setIsOpenCompras,
      openModalCompras,
      closeModalCompras
    }}>
      {children}
    </CompraContext.Provider>
  )
}

export const useCompra = () => {
  const context = useContext(CompraContext)
  if (!context) {
    throw new Error("useCompra deve ser usado dentro de CompraProvider");
  }
  return context;
}