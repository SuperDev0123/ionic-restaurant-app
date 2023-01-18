import { styled } from "@mui/system"
import MuiPaper from "@mui/material/Paper"
import Modal from "@mui/material/Modal"

const StyledModal = styled(MuiPaper)`
  position: relative;
  width: 500px;
  padding: 2rem;
  max-width: 100%;
  max-height: 80vh;
  overflow: scroll;
  h2 {
    margin-bottom: 2rem;
  }
  .closeModalIcon {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
  .doneModalIcon {
    position: absolute;
    right: 4rem;
    top: 1rem;
  }
  .MuiFormControl-root {
    margin-bottom: 2rem;
  }
`

const ModalPaper = ({ children, isOpen, onClose }) => (
  <Modal
    open={isOpen}
    onClose={onClose}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <StyledModal>{children}</StyledModal>
  </Modal>
)

export default ModalPaper
