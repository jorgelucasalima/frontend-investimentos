import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiMoreHorizontal } from "react-icons/fi";

interface DropdownProps {
  openModalCompras: () => void;
  openModalVenda: () => void;
  deleteAction: () => void;
}

export default function Dropdown({ openModalCompras, openModalVenda, deleteAction }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Função para fechar o dropdown se clicar fora
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Adiciona o event listener apenas quando o dropdown está aberto
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Remove o event listener ao fechar o dropdown
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown}><FiMoreHorizontal /></DropdownButton>
      <DropdownList isOpen={isOpen}>
        <DropdownItem onClick={() => { setIsOpen(false); openModalCompras(); }}>Nova Compra</DropdownItem>
        <DropdownItem onClick={() => { setIsOpen(false); openModalVenda(); }}>Nova Venda</DropdownItem>
        <DropdownItem onClick={() => { setIsOpen(false); deleteAction(); }}>Excluir</DropdownItem>
      </DropdownList>
    </DropdownContainer>
  );
}

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #E7EEF8;
  border: none;
  border-radius: 13px;
  width: 45px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;
  color: #999999;

  &:hover {
    background-color: #e2e5ea;
  }
`;

const DropdownList = styled.ul<{ isOpen: boolean }>`
  list-style-type: none;
  margin: 0;
  padding: 10px 0;
  background-color: #ffffff;
  border: 1px solid #e2e5ea;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: -40px;
  width: 180px;
  z-index: 1;
`;

const DropdownItem = styled.li`
  width: 170px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  color: #333333;

  &:hover {
    background-color: #f2f4f7;
  }

  &:last-child {
    border-top: 1px solid #e2e5ea;
  }
`;