import styled from "styled-components"

interface SelectFormProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  bold: boolean
} 

export default function SelectForm({options, value, onChange, bold} : SelectFormProps) {

  return (
    <Select
      name="select"
      value={value} 
      onChange={onChange}
      bold={bold}
    > 
      <Option value="" disabled selected  bold={bold}>Tipo</Option>

      {options.map((option) => (
        <Option value={option.value} key={option.value} bold={bold}>
          {option.label}
        </Option>
      ))}
      
    </Select>
  )
}

const Select = styled.select<{bold: boolean}>`
  width: 100%;
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 10px;
  font-size: 15px;

  background-color: #F8F9FA;
  color: var(--text-color);
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')}; /* Aplica negrito ao valor */
`

const Option = styled.option<{bold: boolean}>`
  width: 100%;
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 10px;
  font-size: 15px;

  background-color: #F8F9FA;
  color: var(--text-color);
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')}; /* Aplica negrito ao valor */
`