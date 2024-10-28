import styled from "styled-components"
import { FiHome } from "react-icons/fi";

export default function Header() {
  return (
    <ContainerHeader>
      <ContentHeader>
        <FiHome size={20}/>
        <p>Meus Investimentos</p>
      </ContentHeader>
      
    </ContainerHeader>
  )
}

const ContainerHeader = styled.div`
  border-radius: 1rem;
`

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`