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
  useDisclosure,
  useMediaQuery
} from "@chakra-ui/react";

import { DataTable } from "@neo/components/DataTable";
import TableActionButton from "@neo/components/DataTable/Action Buttons";
import SearchInput from "@neo/components/Form/SearchInput";

import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import { useForm } from "react-hook-form";
import { svgAssets } from "../../../../assets/images/svgs/index";
import AddFeeAndChargesDetails from "./AddFeeAndChargesDetails";

const defaultValues = {
  feeName: "",
  country: "",
  currency: ""
};
interface AddFeeandChargesProps {
  onClose: () => void;
}
const AddFeeandCharges = ({ onClose }: AddFeeandChargesProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: defaultValues
  });
  const { isOpen, onOpen, onClose: onModalClose } = useDisclosure();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");

  const onEditState = () => {
    //
  };
  const onDeleteState = () => {
    //
  };

  const tableData = [
    {
      sn: 1,
      paymentMethod: "Nepali Rupee",
      fee: "100",
      type: "Flat"
    },
    {
      sn: 2,
      paymentMethod: "Nepali Rupee",
      fee: "100",
      type: "Flat"
    },
    {
      sn: 3,
      paymentMethod: "Nepali Rupee",
      fee: "100",
      type: "Flat"
    },
    {
      sn: 4,
      paymentMethod: "Nepali Rupee",
      fee: "100",
      type: "Percentage"
    },
    {
      sn: 5,
      paymentMethod: "Nepali Rupee",
      fee: "100",
      type: "Flat"
    }
  ];
  const columns = [
    {
      header: "S.N",
      accessorKey: "sn"
    },
    {
      header: "Payment Method",
      accessorKey: "paymentMethod",
      size: 100
    },
    {
      header: "Fee and Charge Type",
      accessorKey: "type"
    },
    {
      header: "Fee",
      accessorKey: "fee"
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

  const handleSaveFeeandCharges = () => {
    //
  };

  return (
    <Flex direction={"column"} gap={"16px"}>
      <form onSubmit={handleSubmit(handleSaveFeeandCharges)}>
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
                Fee Details
              </Heading>
              <Box padding={"24px"} gap={"20px"} width={"100%"}>
                <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={10}>
                  <GridItem colSpan={1}>
                    <TextInput
                      control={control}
                      name="feeName"
                      label="Enter Fee Name"
                      type="text"
                      isRequired
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Select
                      name="country"
                      placeholder="Country"
                      control={control}
                      options={[
                        { value: "Nepal", label: "Nepal" },
                        { value: "India", label: "India" },
                        { value: "China", label: "China" }
                      ]}
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <TextInput
                      control={control}
                      name="currency"
                      label="Currency"
                      type="text"
                      isRequired
                      isReadOnly
                    />
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
              Fees and Charges Details
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
                    Add Fee and Charges Details
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
            <Flex
              justifyContent={"flex-end"}
              padding={"16px"}
              gap={"16px"}
              width={"100%"}
            >
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
              <Button
                padding={"16px 32px"}
                fontWeight={600}
                // onClick={}
                type="submit"
              >
                Save
              </Button>
            </Flex>
          </CardBody>
        </Card>

        <AddFeeAndChargesDetails
          isOpen={isOpen}
          onClose={() => {
            onModalClose();
          }}
        />
      </form>
    </Flex>
  );
};

export default AddFeeandCharges;
