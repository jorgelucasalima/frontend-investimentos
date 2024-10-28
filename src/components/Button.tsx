import styled from "styled-components";
import { FiPlus } from "react-icons/fi";

interface Props {
  title: string;
  onClick: () => void;
}

export default function Button({ title, onClick }: Props) {
  return (
    <ContainerButton
      className="button"
      onClick={onClick}
    >
      <FiPlus size={16} style={{ marginRight: 10 }}/>
      {title}
    </ContainerButton>
  );
}

const ContainerButton = styled.button`
  background: var(--button-color);
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 2rem 4px 2rem; 

  font-size: 14px;
  border: none;
  border-radius: 1rem;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }

`;