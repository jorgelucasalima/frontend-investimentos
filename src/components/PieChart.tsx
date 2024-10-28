import ReactECharts from 'echarts-for-react';
import { useAtivo } from "../contexts/AtivoContext";

export default function PieChart(){

  const { ativos } = useAtivo();
  console.log(ativos)



  const options = {

    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: '65%', // Posiciona a legenda à direita do gráfico
      top: 'center', // Centraliza a legenda verticalmente
      formatter: function (name : string) {
        const quantidade = ativos.find(ativo => 
          (ativo.tipo === 'FI' && name === 'Fundo Imobiliário') ||
          (ativo.tipo === 'AC' && name === 'Ações') ||
          (ativo.tipo === 'CR' && name === 'Criptomoedas') ||
          (ativo.tipo === 'RF' && name === 'Renda Fixa')
        )?.quantidade;

        return (
          name + " " + new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(quantidade || 0)
        )
      },
    },
    series: [
      {
        name: 'Ativos',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['35%', '50%'],
        color: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        data: ativos.map(ativo => ({
          name: 
            ativo.tipo === 'FI' ? 'Fundo Imobiliário' :
            ativo.tipo === 'AC' ? 'Ações' :
            ativo.tipo === 'CR' ? 'Criptomoedas' :
            ativo.tipo === 'RF' ? 'Renda Fixa' :
            ativo.tipo,
          value: ativo.quantidade
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: 300, width: '80%' }} />;
};
