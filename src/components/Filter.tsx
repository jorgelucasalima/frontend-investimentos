import styled from "styled-components";


export default function Filter() {
  return (
    <Input type="text" placeholder="Buscar ativo" />
  );
}


const Input = styled.input` 
  border: none;
  border-radius: 8px;
  padding: 8px;
  font-size: 13px;

  background-color: #F8F9FA;
`;
