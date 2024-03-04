import {
  Avatar,
  AvatarBadge,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Stack,
  Text
} from "@chakra-ui/react";
import { colorScheme } from "@neo/theme/colorScheme";
import { FC, useRef } from "react";

import { BsCheck2Circle, BsChevronDown } from "react-icons/bs";
import { svgAssets } from "../../assets/images/svgs/index";
import { HeaderAnchor } from "./Header";

interface IRightHeader {
  mobileMoreAnchorEl: HeaderAnchor;
  isMobileMenuOpen: boolean;
  mobileMenuId: string;
  handleMobileMenuClose: () => void;
}
const languageOptions = [
  { value: "en", label: "English", icon: <svgAssets.SelectDropdown /> },
  { value: "np", label: "Nepali", icon: <svgAssets.SelectDropdown /> }
];
export const RightHeader: FC<IRightHeader> = () => {
  const initialFocusRef = useRef();

  return (
    <HStack gap={8}>
      <HStack>
        <Select
          bgColor={colorScheme.gray_50}
          borderRadius={"30px"}
          icon={<svgAssets.SelectDropdown />}
          size={"lg"}
        >
          {languageOptions.map(option => (
            <option
              style={{
                borderRadius: "30px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </Select>
      </HStack>
      <Popover initialFocusRef={initialFocusRef.current} placement="bottom">
        <PopoverTrigger>
          <IconButton
            aria-label="notification"
            borderRadius={"full"}
            bg={"white"}
            _hover={{
              boxShadow: `0 0 6px 1px ${colorScheme.white}`
            }}
            _focus={{
              boxShadow: `0 0 6px 1px ${colorScheme.white}`
            }}
            _expanded={{
              boxShadow: `0 0 6px 1px ${colorScheme.white}`
            }}
            icon={<svgAssets.NotificationIcon color={colorScheme.blue_700} />}
          ></IconButton>
        </PopoverTrigger>
        <PopoverContent
          color={colorScheme.gray_800}
          borderColor="blue.800"
          mx={8}
          w={"500px"}
        >
          <PopoverHeader pt={4} fontWeight="bold" border="0">
            <HStack justifyContent={"space-between"}>
              <HStack gap={4}>
                <Text>Notification</Text>
                <HStack color={colorScheme.gray_400}>
                  <Text fontWeight={"normal"}>All</Text>
                  <BsChevronDown />
                </HStack>
              </HStack>
              <HStack>
                <Text color={colorScheme.blue_700}>Mark as read</Text>
                <BsCheck2Circle />
              </HStack>
            </HStack>
          </PopoverHeader>
          <PopoverArrow />
          <PopoverBody>
            <HStack
              alignItems={"flex-start"}
              py={4}
              borderBottom={"1px solid"}
              borderTop={"1px solid"}
              borderColor={colorScheme.gray_200}
            >
              <Avatar>
                <AvatarBadge
                  sx={{
                    boxSize: "1.25em",
                    bg: "orange",
                    position: "absolute",
                    top: -2,
                    left: -2,
                    height: "1rem",
                    width: "1rem"
                  }}
                />
              </Avatar>
              <Stack>
                <Text fontWeight={"500"}>
                  Dear Shyam, transaction done with amount 1000 for NTC Prepaid
                  Top-up
                </Text>
                <Text color={colorScheme.gray_600}>Today at 9:42 AM</Text>
              </Stack>
            </HStack>
            <HStack
              alignItems={"flex-start"}
              py={4}
              borderBottom={"1px solid"}
              borderColor={colorScheme.gray_200}
            >
              <Avatar>
                <AvatarBadge
                  sx={{
                    boxSize: "1.25em",
                    bg: "orange",
                    position: "absolute",
                    top: -2,
                    left: -2,
                    height: "1rem",
                    width: "1rem"
                  }}
                />
              </Avatar>
              <Stack>
                <Text fontWeight={"500"}>
                  Dear Shyam, transaction done with amount 1000 for NTC Prepaid
                  Top-up
                </Text>
                <Text color={colorScheme.gray_600}>Today at 9:42 AM</Text>
              </Stack>
            </HStack>
            <HStack
              alignItems={"flex-start"}
              py={4}
              borderBottom={"1px solid"}
              borderColor={colorScheme.gray_200}
            >
              <Avatar>
                <AvatarBadge
                  sx={{
                    boxSize: "1.25em",
                    bg: "orange",
                    position: "absolute",
                    top: -2,
                    left: -2,
                    height: "1rem",
                    width: "1rem"
                  }}
                />
              </Avatar>
              <Stack>
                <Text fontWeight={"500"}>
                  Dear Shyam, transaction done with amount 1000 for NTC Prepaid
                  Top-up
                </Text>
                <Text color={colorScheme.gray_600}>Today at 9:42 AM</Text>
              </Stack>
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </HStack>
  );
};
