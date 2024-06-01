import {
  Button,
  Card,
  CardBody,
  Flex,
  GridItem,
  HStack,
  Heading,
  SimpleGrid
} from "@chakra-ui/react";
import BreadCrumb from "@neo/components/BreadCrumb";
import Editor from "@neo/components/Editor";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

const VoucherEntry = () => {
  const { control } = useForm();
  const { pathname } = useLocation();

  const activePath = breadcrumbTitle(pathname);
  return (
    <Flex flexDir={"column"} gap={"16px"}>
      <BreadCrumb currentPage="Voucher Entry" options={activePath} />
      <Card
        borderRadius={"16px"}
        boxShadow="0px 4px 18px 0px rgba(0, 0, 0, 0.03)"
      >
        <CardBody gap={10}>
          <Heading fontSize={"17px"}>Voucher Description</Heading>

          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={"16px"}>
            <GridItem colSpan={1}>
              <Select name="type" placeholder="Type" control={control} />
            </GridItem>
            <GridItem colSpan={1}>
              <Select
                name="ledgerhead"
                placeholder="-Ledger Head-"
                control={control}
              />
            </GridItem>
            <GridItem colSpan={1}></GridItem>
            <GridItem>
              <Select
                name="remainingbalance"
                placeholder="Remaining Balance"
                control={control}
              />
            </GridItem>
            <GridItem>
              <Select
                name="voucheramount"
                placeholder="-Voucher Amount"
                control={control}
              />
            </GridItem>
            <GridItem>
              <Select
                name="exchangerate"
                placeholder="Exchange Rate"
                control={control}
              />
            </GridItem>
            <GridItem>
              <Select
                name="localcurrency"
                placeholder="Local Currency"
                control={control}
              />
            </GridItem>
            <GridItem>
              <Select name="entry" placeholder="Entry" control={control} />
            </GridItem>
          </SimpleGrid>
        </CardBody>
      </Card>

      <Card borderRadius={"16px"}>
        <CardBody>
          <Heading fontSize={"17px"}>Voucher Detail</Heading>
        </CardBody>
      </Card>

      <Card borderRadius={"16px"}>
        <CardBody>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={"16px"}>
            <GridItem>
              <TextInput
                type="date"
                control={control}
                name="date"
                label="Date"
                required
              />
            </GridItem>
          </SimpleGrid>
          <HStack>
            <Editor control={control} name="description" />
          </HStack>
        </CardBody>
      </Card>
      <HStack mt={8} justifyContent={"flex-end"}>
        <Button
          padding={"16px 32px"}
          fontWeight={600}
          color={"#E53E3E"}
          _hover={{ bg: "#FFF5F5" }}
          bg={"#FFF5F5"}
          _active={{ bg: "#FFF5F5" }}
          fontSize={"17px"}
        >
          Cancel
        </Button>
        <Button padding={"10px 40px"} fontWeight={700} type="submit">
          Save
        </Button>
      </HStack>
    </Flex>
  );
};
export default VoucherEntry;
