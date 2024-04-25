import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import { svgAssets } from "@neo/assets/images/svgs";
import { colorScheme } from "@neo/theme/colorScheme";
import { ReactElement, useRef } from "react";
export interface IConfirmationModalProps {
  variant?: string;
  isOpen: boolean;
  onClose: () => void;
  buttonText: string;
  buttonBg?: string;
  title: string;
  isLoading?: boolean;
  message: string;
  onApprove: () => void;
  customIcon?: ReactElement;
}

function ConfirmationModal({
  variant,
  onClose,
  isOpen,
  title,
  message,
  isLoading,
  buttonText,
  buttonBg,
  onApprove,
  customIcon
}: IConfirmationModalProps) {
  const finalRef = useRef(null);
  return (
    <>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent
          borderRadius="32px"
          background={colorScheme.white}
          box-shadow="2px 2px 31px 0px rgba(0, 0, 0, 0.08)"
        >
          <ModalCloseButton />
          <Center mt={15} p={4} flexDirection="column">
            <>
              {customIcon ? (
                customIcon
              ) : variant == "edit" ? (
                // <svgAssets.EditButton height={"64px"} width={"64px"} />
                <svgAssets.Frame height={"64px"} width={"64px"} />
              ) : variant == "delete" ? (
                <svgAssets.DeleteButton height={"64px"} width={"64px"} />
              ) : null}
              <ModalHeader fontSize={"20px"} pt={4} pb={2}>
                {title ?? "Confirmation Modal"}
              </ModalHeader>
              <ModalBody fontSize="14px" px={6}>
                {message ?? "Are you sure you want to proceed?"}
              </ModalBody>
            </>
          </Center>
          <ModalFooter>
            <Button
              padding={"16px 32px"}
              fontWeight={600}
              color={"#E53E3E"}
              _hover={{ bg: "#FFF5F5" }}
              bg={"#FFF5F5"}
              _active={{ bg: "#FFF5F5" }}
              fontSize={"17px"}
              onClick={onClose}
            >
              Cancel
            </Button>
            {buttonBg ? (
              <Button
                width={"100%"}
                padding={"16px 32px"}
                fontWeight={600}
                bg={buttonBg}
                _hover={{ filter: "brightness(105%)" }}
                onClick={onApprove}
                isLoading={isLoading}
              >
                {buttonText}
              </Button>
            ) : (
              <Button
                padding={"16px 32px"}
                fontWeight={600}
                onClick={onApprove}
                isLoading={isLoading}
              >
                {buttonText}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default ConfirmationModal;
