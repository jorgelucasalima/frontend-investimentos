import styled from 'styled-components';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems
}: PaginationProps) {

  return (
    <Container>
      <ResultText>
        Mostrando {totalItems > 0 ? 1 : 0} resultado
      </ResultText>

      <ButtonGroup>
        <BaseButton
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          «
        </BaseButton>

        <BaseButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹
        </BaseButton>

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <PageButton
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              active={currentPage === pageNumber}
            >
              {pageNumber}
            </PageButton>
          );
        })}

        <BaseButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ›
        </BaseButton>

        <BaseButton
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          »
        </BaseButton>
      </ButtonGroup>

      <SelectWrapper>
        <Select
          value={itemsPerPage}
          onChange={(e) => onPageChange(1, Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </Select>
      </SelectWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0.5rem;
 // gap: 0.5rem;
`;

const ResultText = styled.div`
  font-size: 0.875rem;
  color: #666666;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  //gap: 0.25rem;
`;

const BaseButton = styled.button`
  padding: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  min-width: 32px;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #f9fafb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageButton = styled(BaseButton)`
  background-color: ${props => props.active ? '#3b82f6' : 'white'};
  color: ${props => props.active ? 'white' : '#6b7280'};
  border-color: ${props => props.active ? '#3b82f6' : '#d1d5db'};
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;