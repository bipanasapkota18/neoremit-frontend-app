import {
  GridItem,
  SimpleGrid,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import { colorScheme } from "@neo/theme/colorScheme";
import { formatSelectOptions } from "@neo/utility/format";
import { Control } from "react-hook-form";

interface ADTabbedPanelProps {
  control: Control<any>;
}

const deductionFromArray = [
  { value: "BOTH", label: "BOTH" },
  { value: "MARGIN", label: "MARGIN" },
  { value: "TRANSACTION_FEE", label: "TRANSACTION_FEE" }
];

const disCountTypeArray = [
  { value: "FLAT", label: "FLAT" },
  { value: "PERCENTAGE", label: "PERCENTAGE" }
];

const discount_type_options = formatSelectOptions<string>({
  data: disCountTypeArray,
  valueKey: "value",
  labelKey: "label"
});

const ADTabbedPanel = ({ control }: ADTabbedPanelProps) => {
  const deduction_from_options = formatSelectOptions<string>({
    data: deductionFromArray,
    valueKey: "value",
    labelKey: "label"
  });
  return (
    <Tabs position="relative" variant="unstyled" isLazy>
      <TabList mx={-1} flex={1}>
        <Tab
          mx={-3}
          sx={{
            color: "#718096"
          }}
          _selected={{ color: "#212B36", bg: "#ffffff" }}
        >
          First N Transactions per customers
        </Tab>
        <Tab
          sx={{
            color: "#718096"
          }}
          _selected={{ color: "#212B36", bg: "#ffffff" }}
        >
          First N Transactions
        </Tab>
      </TabList>
      <TabIndicator
        // ml={4}
        height="3px"
        bg={colorScheme.primary_400}
        borderRadius="2px"
      />
      <TabPanels>
        <TabPanel px={0}>
          <SimpleGrid columns={3} columnGap={"8px"} spacing={"8px"}>
            <GridItem colSpan={1}>
              <TextInput
                type="number"
                control={control}
                name="firstNTransactionPerCustomer.noOfTransactions"
                label="Number Of Transactions"
                required
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                type="number"
                control={control}
                name="firstNTransactionPerCustomer.capAmount"
                label="Enter Cap Amount"
                required
              />
            </GridItem>
            <GridItem colSpan={1}>
              <Select
                placeholder="-Deduction From-"
                control={control}
                name="firstNTransactionPerCustomer.deductionFrom"
                // label="Deduction From"
                options={deduction_from_options ?? []}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <Select
                control={control}
                placeholder="-Discount Type-"
                name="firstNTransactionPerCustomer.discountType"
                // label="Deduction From"
                options={discount_type_options ?? []}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                type="number"
                control={control}
                name="firstNTransactionPerCustomer.discountAmount"
                label="Enter Discount Amount"
                required
              />
            </GridItem>
          </SimpleGrid>
        </TabPanel>
        <TabPanel px={0} display={"flex"} flexDirection={"column"}>
          <SimpleGrid columns={3} columnGap={"8px"}>
            <GridItem colSpan={1}>
              <TextInput
                type="number"
                control={control}
                name="firstNTransaction.noOfTransactions"
                label="Number Of Transactions"
                required
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                type="number"
                control={control}
                name="firstNTransaction.capAmount"
                label="Enter Cap Amount"
                required
              />
            </GridItem>
            <GridItem colSpan={1}>
              <Select
                placeholder="-Deduction From-"
                control={control}
                name="firstNTransaction.deductionFrom"
                // label="Deduction From"
                options={deduction_from_options ?? []}
              />
            </GridItem>
          </SimpleGrid>
          <SimpleGrid columns={3} py={2} columnGap={"8px"}>
            <GridItem colSpan={1}>
              <TextInput
                type="date"
                control={control}
                name="firstNTransaction.validFrom"
                label="Valid From"
                required
                // max={watch("validTo") ?? new Date().getDate()}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                type="date"
                control={control}
                name="firstNTransaction.validTill"
                label="Valid To"
                required
                // max={watch("validTo") ?? new Date().getDate()}
              />
            </GridItem>
          </SimpleGrid>
          <SimpleGrid columns={3} py={3} columnGap={"8px"}>
            <GridItem colSpan={1}>
              <Select
                control={control}
                placeholder="-Discount Type-"
                name="firstNTransaction.discountType"
                // label="Deduction From"
                options={discount_type_options ?? []}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <TextInput
                type="number"
                control={control}
                name="firstNTransaction.discountAmount"
                label="Enter Discount Amount"
                required
              />
            </GridItem>
          </SimpleGrid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ADTabbedPanel;
