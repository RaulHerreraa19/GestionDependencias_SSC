import { Modal, Box } from "@mui/material";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);

  const openModal = (component) => {
    setContent(component);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
  }

  return (
    <ModalContext.Provider value={{ isOpen, openModal,closeModal  }}>
      {isOpen && 
        <Modal open={isOpen} onClose={closeModal}>
          {children}
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
            {content}
          </Box>
        </Modal>
      }
    </ModalContext.Provider>
  )
}

// export default function ModalEdit({ open, handleClose, children }) {
//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           bgcolor: "background.paper",
//           boxShadow: 24,
//           p: 4,
//           borderRadius: 2,
//         }}
//       >
//         {children}
//       </Box>
//     </Modal>
//   );
// }
