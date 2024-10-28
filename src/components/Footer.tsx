import styled from "styled-components";

export default function Footer() {


  return (
    <Container>
      <p>2024 - todos os direitos reservados</p>
    </Container>
  )
}

const Container = styled.footer`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  padding: 15px;
  border-radius: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`