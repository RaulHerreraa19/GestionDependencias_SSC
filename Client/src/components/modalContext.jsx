import { Modal, Box } from "@mui/material";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [dataForm, setDataForm] = useState(null);

  const openModal = (component, dynamicData = null) => {
    setDataForm(dynamicData);
    setIsOpen(true);
    setContent(() => component);
  };

  const closeModal = () => {
    setIsOpen(false);
    setDataForm(null);
    setContent(null);
  }

  return (
    <ModalContext.Provider value={{ isOpen, openModal,closeModal, dataForm, setDataForm }}>
      {children}
      {isOpen && content && (
        <Modal open={isOpen} onClose={closeModal}>
          
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            {typeof content === "function" ? content({ data:dataForm }) : content}
          </Box>
        </Modal>
      )}
    </ModalContext.Provider>
  )
}
