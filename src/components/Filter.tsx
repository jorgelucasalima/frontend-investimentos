import styled from "styled-components";

interface FilterProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Filter({ value, onChange }: FilterProps) {
  return (
    <Input 
      type="text" 
      placeholder="Buscar ativo" 
      value={value}
      onChange={ onChange }
    />
  );
}


const Input = styled.input` 
  border: none;
  border-radius: 8px;
  padding: 8px;
  font-size: 13px;

  background-color: #F8F9FA;
`;
