import {
  Button,
  Modal as ChakraModal,
  ModalProps as ChakraModalProps,
  Divider,
  HStack,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";

//to use other provided props of chakra modal
type ModalProps = {
  title?: string;
  submitButtonText?: string;
  cancelButtonText?: string;
  isSubmitting?: boolean;
  onSubmit?: () => void;
} & ChakraModalProps;
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "2xl",

  isSubmitting,
  onSubmit,

  submitButtonText,
  cancelButtonText,
  ...rest
}: ModalProps) => {
  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  return (
    <ChakraModal size={size} isOpen={isOpen} onClose={handleClose} {...rest}>
      <ModalOverlay />
      <ModalContent
        mt={[0, 118]}
        display={"flex"}
        justifyContent={"center"}
        gap={"32px"}
        width={"552px"}
        padding={"32px"}
        borderRadius={"32px"}
        background="#FEFEFE"
        box-shadow="2px 2px 31px 0px rgba(0, 0, 0, 0.08)"
      >
        <HStack alignItems={"center"}>
          <ModalHeader flex={1} padding={0} fontWeight={700} fontSize={"24px"}>
            {title}
          </ModalHeader>
          <ModalCloseButton
            position={"relative"}
            top={0}
            right={0}
            size="sm"
            borderRadius={"full"}
          />
        </HStack>
        <Divider color={"#EDF2F7"} />

        <ModalBody py={4} px={0}>
          {children}
        </ModalBody>
        <Divider color={"#EDF2F7"} />

        <ModalFooter
          display="flex"
          justifyContent={"space-between"}
          align-items="flex-start"
          gap="24px"
          align-self="stretch"
        >
          <Button
            width={"100%"}
            padding={"16px 32px"}
            fontWeight={600}
            color={"#E53E3E"}
            bg={"#FFF5F5"}
            fontSize={"17px"}
            onClick={handleClose}
          >
            {cancelButtonText}
          </Button>
          <Button
            width={"100%"}
            padding={"16px 32px"}
            fontWeight={600}
            isLoading={isSubmitting}
            onClick={isSubmitting ? undefined : onSubmit}
          >
            {submitButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
