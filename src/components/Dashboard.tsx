import styled from "styled-components";
import Card from "./Card";
import { useAtivo } from "../contexts/AtivoContext";
import { useCompra } from "../contexts/CompraContext";
import { useVenda } from "../contexts/VendaContext";
import { useEffect, useState } from "react";

import Compra from "../types/type.compra";
import Venda from "../types/type.venda";


export default function Dashboard() {

  const { ativos } = useAtivo();
  const { compras } = useCompra()
  const { vendas } = useVenda()
  console.log(vendas)

  const [comprasDoMesAtual, setComprasDoMesAtual] = useState<Compra[]>([]);
  const [vendasDoMesAtual, setVendasDoMesAtual] = useState<Venda[]>([]);

  const quantidadeAtivos = ativos?.length;

  const calcularSaldoBruto = () => {
    return ativos.reduce((total, ativo) => {
      return total + (ativo.quantidade * ativo.cotacao);
    }, 0);
  };


  useEffect(() => {
    if (compras) {
      // Filtrando as compras do mês atual
      const comprasMesAtual = compras.filter((compra) => {
        const dataCompra = new Date(compra.data_compra);
        const hoje = new Date();
  
        return (
          dataCompra.getMonth() === hoje.getMonth() &&
          dataCompra.getFullYear() === hoje.getFullYear()
        );
      });
  
      setComprasDoMesAtual(comprasMesAtual);
    }
  }, [compras]);

  useEffect(() => {

    if (vendas) {
      const vendaMesAtual = vendas.filter((venda) => {
        const dataVenda = new Date(venda.data_venda);
        const hoje = new Date();
  
        return (
          dataVenda.getMonth() === hoje.getMonth() &&
          dataVenda.getFullYear() === hoje.getFullYear()
        );
      });
  
      setVendasDoMesAtual(vendaMesAtual);
    }
  }, [vendas])



  return (
    <Container>
      <Card title="Saldo Bruto" content={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calcularSaldoBruto())} />
      <Card title="Total de ativos" content={quantidadeAtivos}/>
      <Card
        title="Movimentações no mês"
        content={`${comprasDoMesAtual.length} compras - ${vendasDoMesAtual.length} vendas`}
      />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  height: 100%;

  margin-top: 1rem;
`