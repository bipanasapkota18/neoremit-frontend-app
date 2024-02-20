import { Text } from "@chakra-ui/react";
import Modal from ".";

interface IDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  isDeleting: boolean;
  confirmationText: string;
}

const DeleteModal = ({
  confirmationText,
  isOpen,
  onClose,
  onDelete,
  isDeleting
}: IDeleteModalProps) => {
  return (
    <Modal
      size={{
        sm: "md"
      }}
      title="fields.delete_title"
      isOpen={isOpen}
      submitButtonText="fields.delete"
      onClose={onClose}
      onSubmit={onDelete}
      isSubmitting={isDeleting}
    >
      <Text color={"text.300"} textAlign={"center"}>
        {confirmationText}
      </Text>
    </Modal>
  );
};

export default DeleteModal;
