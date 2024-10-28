import styled from "styled-components"

interface InputFormProps {
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  bold: boolean;
}

export default function InputForm({
  type,
  placeholder,
  value,
  onChange,
  disabled,
  bold
}: InputFormProps) {

  return (
    <InputContainer>
      <FloatingLabel isFloating={Boolean(value)}>
        {placeholder}
      </FloatingLabel>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        bold={bold}
      />
    </InputContainer>
  )
}

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const FloatingLabel = styled.label<{ isFloating: boolean }>`
  position: absolute;
  left: 10px;
  top: ${({ isFloating }) => (isFloating ? "-4px" : "-4px")};
  font-size: ${({ isFloating }) => (isFloating ? "10px" : "12px")};
  color: ${({ isFloating }) => (isFloating ? "#333" : "#333")};
  pointer-events: none;
  transition: all 0.2s ease;
`;

const Input = styled.input<{ disabled: boolean; bold: boolean }>` 
  width: 100%;
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 10px;
  font-size: 15px;
  background-color: ${(props) => (props.disabled ? '#D4D4D4' : '#F8F9FA')};
  color: var(--text-color);
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')}; /* Aplica negrito ao valor */
`;