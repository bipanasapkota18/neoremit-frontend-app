import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  GridItem,
  HStack,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
  useMediaQuery
} from "@chakra-ui/react";
import { svgAssets } from "@neo/assets/images/svgs";
import BreadCrumb from "@neo/components/BreadCrumb";
import { DataTable } from "@neo/components/DataTable";
import TableActionButton from "@neo/components/DataTable/Action Buttons";
import SearchInput from "@neo/components/Form/SearchInput";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
import { colorScheme } from "@neo/theme/colorScheme";
import { useLocation } from "react-router-dom";
import AddState from "./AddState";

const State = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");

  const { pathname } = useLocation();
  const onEditState = () => {
    //
  };
  const onDeleteState = () => {
    //
  };
  const tableData = [
    {
      sn: 1,
      stateName: "Nepali Rupee"
    },
    {
      sn: 2,
      stateName: "US Dollar"
    },
    {
      sn: 3,
      stateName: "Euro"
    },
    {
      sn: 4,
      stateName: "British Pound"
    },
    {
      sn: 5,
      stateName: "Australian Dollar"
    }
  ];
  const columns = [
    {
      header: "S.N",
      accessorKey: "sn"
    },
    {
      header: "State Name",
      accessorKey: "stateName",
      size: 100
    },

    {
      header: "Action",
      accessorKey: "action",

      cell: () => {
        return (
          <HStack>
            <TableActionButton
              onClickAction={onEditState}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={onDeleteState}
              icon={<svgAssets.DeleteButton />}
              label="Delete"
            />
          </HStack>
        );
      }
    }
  ];
  const activePath = breadcrumbTitle(pathname);

  return (
    <Flex direction={"column"} gap={"16px"}>
      <BreadCrumb currentPage="State Setup" options={activePath} />
      <Card
        borderRadius={"16px"}
        boxShadow="0px 4px 18px 0px rgba(0, 0, 0, 0.03)"
      >
        <CardBody>
          <HStack
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
          >
            <Heading
              fontSize="17px"
              fontStyle="normal"
              fontWeight={700}
              lineHeight="normal"
              color={"#2D3748"}
            >
              Country Details
            </Heading>
            <Box
              padding={"24px"}
              gap={"20px"}
              bgColor={colorScheme.gray_50}
              width={"100%"}
            >
              <SimpleGrid columns={4} spacing={10}>
                <GridItem colSpan={1}>
                  <HStack>
                    <Text
                      color={colorScheme.search_icon}
                      fontSize="14px"
                      fontWeight={400}
                    >
                      Country Name
                    </Text>
                    <Text
                      fontSize="14px"
                      color={colorScheme.gray_700}
                      fontWeight={600}
                    >
                      Nepal
                    </Text>
                  </HStack>
                </GridItem>
                <GridItem colSpan={1}>
                  <VStack alignItems={"flex-start"} gap={"24px"}>
                    <HStack
                      width={"100%"}
                      justifyContent={"space-between"}
                      spacing={20}
                    >
                      <Text
                        color={colorScheme.search_icon}
                        fontSize="14px"
                        fontWeight={400}
                      >
                        Country Name
                      </Text>
                      <Text
                        fontSize="14px"
                        color={colorScheme.gray_700}
                        fontWeight={600}
                      >
                        Nepal
                      </Text>
                    </HStack>
                    <HStack
                      width={"100%"}
                      justifyContent={"space-between"}
                      spacing={20}
                    >
                      <Text
                        color={colorScheme.search_icon}
                        fontSize="14px"
                        fontWeight={400}
                      >
                        Country Short Name
                      </Text>
                      <Text
                        fontSize="14px"
                        color={colorScheme.gray_700}
                        fontWeight={600}
                      >
                        Nep
                      </Text>
                    </HStack>
                  </VStack>
                </GridItem>
                <GridItem colSpan={1}>
                  <VStack alignItems={"flex-start"} gap={"24px"}>
                    <HStack
                      width={"100%"}
                      justifyContent={"space-between"}
                      spacing={20}
                    >
                      <Text
                        color={colorScheme.search_icon}
                        fontSize="14px"
                        fontWeight={400}
                      >
                        ISO Number
                      </Text>
                      <Text
                        fontSize="14px"
                        color={colorScheme.gray_700}
                        fontWeight={600}
                      >
                        55852
                      </Text>
                    </HStack>
                    <HStack
                      width={"100%"}
                      justifyContent={"space-between"}
                      spacing={20}
                    >
                      <Text
                        color={colorScheme.search_icon}
                        fontSize="14px"
                        fontWeight={400}
                      >
                        Country Code
                      </Text>
                      <Text
                        fontSize="14px"
                        color={colorScheme.gray_700}
                        fontWeight={600}
                      >
                        +977
                      </Text>
                    </HStack>
                  </VStack>
                </GridItem>
                <GridItem colSpan={1}>
                  <VStack alignItems={"flex-start"} gap={"24px"}>
                    <HStack
                      width={"100%"}
                      justifyContent={"space-between"}
                      spacing={20}
                    >
                      <Text
                        color={colorScheme.search_icon}
                        fontSize="14px"
                        fontWeight={400}
                      >
                        Phone Code
                      </Text>
                      <Text
                        fontSize="14px"
                        color={colorScheme.gray_700}
                        fontWeight={600}
                      >
                        +977
                      </Text>
                    </HStack>
                    <HStack
                      width={"100%"}
                      justifyContent={"space-between"}
                      spacing={20}
                    >
                      <Text
                        color={colorScheme.search_icon}
                        fontSize="14px"
                        fontWeight={400}
                      >
                        Currency
                      </Text>
                      <Text
                        fontSize="14px"
                        color={colorScheme.gray_700}
                        fontWeight={600}
                      >
                        Rs.
                      </Text>
                    </HStack>
                  </VStack>
                </GridItem>
              </SimpleGrid>
            </Box>
          </HStack>

          <Heading
            fontSize="17px"
            fontStyle="normal"
            fontWeight={700}
            lineHeight="normal"
            color={"#2D3748"}
            p={4}
          >
            State Details
          </Heading>
          <Card borderRadius={"16px"} borderTop={"1px solid #EDF2F7"}>
            <CardBody>
              <HStack justifyContent={"space-between"}>
                <HStack
                  display="flex"
                  padding="24px 20px"
                  alignItems="center"
                  gap="16px"
                  alignSelf="stretch"
                >
                  {isDesktop ? (
                    <SearchInput
                      width={"450px"}
                      label="Search"
                      name="search"
                      type="text"
                    />
                  ) : (
                    ""
                  )}
                </HStack>
                <Button
                  minW={"max-content"}
                  leftIcon={<svgAssets.AddButton />}
                  onClick={onOpen}
                >
                  Add State
                </Button>
              </HStack>

              <DataTable
                pagination={{
                  manual: false
                }}
                data={tableData}
                columns={columns}
              />
            </CardBody>
          </Card>
        </CardBody>
      </Card>

      <AddState
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
      />
    </Flex>
  );
};

export default State;
