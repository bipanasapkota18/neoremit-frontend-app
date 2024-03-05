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
  Stack,
  Text
} from "@chakra-ui/react";
import { colorScheme } from "@neo/theme/colorScheme";
import { FC, useRef } from "react";

import { BsCheck2Circle, BsChevronDown } from "react-icons/bs";
import ReactSelect from "react-select";
import { svgAssets } from "../../assets/images/svgs/index";
import { HeaderAnchor } from "./Header";

interface IRightHeader {
  mobileMoreAnchorEl: HeaderAnchor;
  isMobileMenuOpen: boolean;
  mobileMenuId: string;
  handleMobileMenuClose: () => void;
}
const languageOptions = [
  {
    value: "en",
    label: "English",
    icon: <svgAssets.EnglishFlag />
  },
  {
    value: "de",
    label: "German",
    icon: <svgAssets.GermanFlag />
  },
  { value: "fr", label: "France", icon: <svgAssets.FranceFlag /> }
];
export const RightHeader: FC<IRightHeader> = () => {
  const initialFocusRef = useRef();

  return (
    <HStack gap={8}>
      <HStack>
        <ReactSelect
          isSearchable={false}
          defaultValue={languageOptions[0]}
          options={languageOptions}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () => <svgAssets.SelectDropdown />
          }}
          styles={{
            control: styles => ({
              ...styles,
              width: "170px",
              height: "56px",
              padding: "8px 12px",
              backgroundColor: colorScheme.gray_50,
              borderRadius: "30px",
              border: "none"
            }),
            menu: styles => ({
              ...styles,
              borderRadius: "12px"
            }),
            option: () => ({
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              backgroundColor: colorScheme.white,
              color: colorScheme.gray_800,
              cursor: "pointer"
            })
          }}
          formatOptionLabel={({ label, icon }) => (
            <HStack
              p={2}
              _hover={{ backgroundColor: colorScheme.gray_50 }}
              _active={{ backgroundColor: colorScheme.gray_50 }}
            >
              {icon}
              <Text
                color={colorScheme.gray_700}
                fontSize="14px"
                fontStyle="normal"
                fontWeight={500}
              >
                {" "}
                {label}
              </Text>
            </HStack>
          )}
        />
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
