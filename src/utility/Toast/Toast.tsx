import { Center, HStack, Icon, IconButton, Text } from "@chakra-ui/react";
import { svgAssets } from "@neo/assets/images/svgs";
import toast from "react-hot-toast";

interface IToast {
  message: string;
  type: "success" | "error";
}
const NeoToast = ({ type, message }: IToast) => {
  toast.custom(
    t => (
      <HStack
        style={{
          minWidth: "400px",
          padding: 15,
          marginRight: 12,
          gap: 6,
          borderRadius: "8px",
          backgroundColor: "#FFF",
          boxShadow: " 0px 8px 16px 0px rgba(145, 158, 171, 0.16)",
          transition: "opacity 200ms ease-in-out",
          opacity: t.visible ? 1 : 0
        }}
        justifyContent={"space-between"}
      >
        <Center
          borderRadius="14px"
          padding={3}
          backgroundColor={type === "success" ? "#C6F6D5" : "#FED7D7"}
        >
          {type === "error" ? (
            <Icon as={svgAssets.ErrorIcon} height={"24px"} width={"24px"} />
          ) : (
            <Icon as={svgAssets.SuccessIccon} height={"24px"} width={"24px"} />
          )}
        </Center>
        <Text fontSize={"md"} fontWeight={500}>
          {message}
        </Text>

        <IconButton
          aria-label="Close"
          icon={<svgAssets.CloseIcon />}
          onClick={() => {
            toast.dismiss(t.id);
          }}
          variant={"unstyled"}
        />
      </HStack>
    ),
    {
      duration: 5000
    }
  );
};
export default NeoToast;
