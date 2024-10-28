import Modal from 'react-modal';
import styled from 'styled-components';
import { FiX } from "react-icons/fi";
import Button from './Button';

interface ModalFormProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  title: React.ReactNode;
  descriptionFooterModal: string;
  children: React.ReactNode;
  action: () => void;
}

export default function ModalForm({ 
  modalIsOpen, 
  closeModal, 
  title,
  descriptionFooterModal,
  children,
  action
} : ModalFormProps ) {


  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <HeaderModal>
          <TitleModal>Adicionar {title}</TitleModal>
          <ButtonIcon onClick={closeModal}>
            <FiX size={30}/>
          </ButtonIcon>
        </HeaderModal>

        <ContentForm>
          {children}
        </ContentForm>

        <ContentFormFooter>
          <p>Total: {descriptionFooterModal ? 
            new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(descriptionFooterModal) 
            : '0,00'}</p>
          <Button 
            title={`Adicionar ${title}`}
            onClick={action}
          />
        </ContentFormFooter>

      </Modal>
    </div>
  );
}


const customStyles = {
  content: {  
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)', 
    borderRadius: '1rem',
    width: '50%',
  },
}

const HeaderModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ButtonIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`
const TitleModal = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color);
`
const ContentForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

`
const ContentFormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p{
    font-size: 14px;
  }
`
