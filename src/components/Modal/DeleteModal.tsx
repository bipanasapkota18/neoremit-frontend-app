import { Text } from "@chakra-ui/react";
import Modal from ".";

interface IConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  isDeleting: boolean;
  confirmationText: string;
  isStatusUpdate?: boolean;
}

const ConfirmationModal = ({
  confirmationText,
  isOpen,
  onClose,
  onDelete,
  isDeleting,
  isStatusUpdate
}: IConfirmationModalProps) => {
  return (
    <Modal
      size={{
        sm: "md"
      }}
      title={isStatusUpdate ? "Update Status" : "Delete Confirmation"}
      isOpen={isOpen}
      submitButtonText="Submit"
      onClose={onClose}
      onSubmit={onDelete}
      isSubmitting={isDeleting}
      cancelButtonText="Cancel"
      box-shadow="2px 2px 31px 0px rgba(0, 0, 0, 0.08)"
    >
      <Text textAlign={"center"}>{confirmationText}</Text>
    </Modal>
  );
};

export default ConfirmationModal;
