import { createGlobalStyle, styled } from 'styled-components'

import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Card from './components/Card';
import Footer from './components/Footer';
import Table from './components/Table';

import { AtivoProvider } from './contexts/AtivoContext';
import { CompraProvider } from './contexts/CompraContext';

import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {

  return (
    <>
      <AtivoProvider>
      <CompraProvider>

        <GlobalStyle />
        <Header />
        <Dashboard />

        <ContentMain>
          <Card title="Carteira" content="R$ 0,00" />
          <Table />
        </ContentMain>

        <Footer/>

      </CompraProvider>
      </AtivoProvider>
    </>
  )
}

export default App

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 4px;
    padding: 2px;
    font-family: 'Quicksand', sans-serif;

    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: #888;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }

  :root {
    --text-color: #4A5260;
    --button-color: #6895F8;

  }


`

const ContentMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 20px;
  
  // Card ocupará 40% da largura do container
  & > div:first-child {
    flex: 0 0 40%; 
  }

  // Table ocupará 60% da largura do container
  & > div:last-child {
    flex: 0 0 60%;
  }

`