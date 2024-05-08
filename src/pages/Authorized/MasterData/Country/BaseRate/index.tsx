import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  GridItem,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { svgAssets } from "@neo/assets/images/svgs";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import baseRateSetupSchema from "@neo/schema/baserate/BaseRate";
import {
  useBaseRateSetup,
  useGetBaseRate
} from "@neo/services/MasterData/service-base-rate";
import {
  useGetCountryById,
  useGetCountryList
} from "@neo/services/MasterData/service-country";
import { colorScheme } from "@neo/theme/colorScheme";
import { ISelectOptions, formatSelectOptions } from "@neo/utility/format";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useSearchParams } from "react-router-dom";
import { IStepProps } from "../CountryDetails/AddCountry";
import AddBaseRate from "./AddBaseRateModal";

export interface IBaseRateData {
  id: number;
  country: string;
  baseRate: string;
}
const defaultValues = {
  senderId: null,
  receiverId: null as unknown as ISelectOptions<number> | null,
  marginType: null as unknown as ISelectOptions<string> | null,
  marginRate: null
};

const BaseRate = ({ stepProps }: IStepProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isNewCountry = searchParams?.get("isNewCountry") ?? false;

  const { data: countryData } = useGetCountryList();

  const {
    isOpen: isOpenAddBaseRateConfigModal,
    onOpen: onOpenAddBaseRateConfigModal,
    onClose: onCloseAddBaseRateConfigModal
  } = useDisclosure();

  const { mutateAsync, isLoading: isAddLoading } = useBaseRateSetup();

  const country_options = formatSelectOptions({
    data: countryData?.data?.data?.filter(country => country?.canReceive),
    valueKey: "id",
    labelKey: "name"
  });

  const marginTypeOptions = [
    { label: "PERCENTAGE", value: "PERCENTAGE" },
    { label: "FLAT", value: "FLAT" }
  ];

  const margin_type_options = formatSelectOptions({
    data: marginTypeOptions,
    valueKey: "value",
    labelKey: "label"
  });

  const [baseRateConfigId, setBaseRateConfigId] = useState(
    null as number | null
  );
  const [receiverId, setReceiverId] = useState(null as number | null);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(baseRateSetupSchema),
    mode: "onChange"
  });

  const { state } = useLocation();

  const selectedCountry = state?.countryData?.find(
    (country: any) => country.id === state?.countryId
  );

  const { data: countryById } = useGetCountryById(
    Number(searchParams.get("countryId"))
  );
  const { data: baseRateData } = useGetBaseRate({
    senderId: Number(searchParams.get("countryId")),
    receiverId: receiverId
  });
  const onAddBaseRate = async (data: typeof defaultValues) => {
    const preparedData = {
      senderId: Number(searchParams.get("countryId")),
      receiverId: data.receiverId?.value,
      marginType: data.marginType?.value,
      marginRate: data.marginRate
    };
    const baseRateAddResponse = await mutateAsync({
      id: baseRateData?.data?.data?.id ?? baseRateConfigId,
      data: preparedData
    });
    if (baseRateAddResponse.status === 200) {
      isNewCountry
        ? setSearchParams({
            countryId: searchParams.get("countryId") + "",
            hasState: searchParams.get("hasState") + "",
            isNewCountry: isNewCountry
          })
        : setSearchParams({
            countryId: searchParams.get("countryId") + "",
            hasState: searchParams.get("hasState") + ""
          });
      stepProps?.nextStep();
    }
  };

  useEffect(() => {
    setValue(
      "marginRate",
      baseRateData?.data?.data?.marginRate != 0
        ? baseRateData?.data?.data?.marginRate
        : null
    );
    setValue(
      "marginType",
      baseRateData?.data?.data?.marginType
        ? {
            label: baseRateData?.data?.data?.marginType ?? null,
            value: baseRateData?.data?.data?.marginType
          }
        : baseRateData?.data?.data?.marginType
    );
  }, [baseRateData]);

  return (
    <Flex direction={"column"} gap={"16px"}>
      <Card
        borderRadius={"32px"}
        boxShadow="0px 4px 18px 0px rgba(0, 0, 0, 0.03)"
      >
        <CardBody>
          <Stack
            as="form"
            onSubmit={handleSubmit(onAddBaseRate)}
            flexDirection={"column"}
            gap={"24px"}
          >
            <HStack
              gap={"24px"}
              alignItems={"flex-start"}
              flexDirection={"column"}
              width={"30%"}
            >
              <Text fontSize={"17px"} fontWeight={700}>
                Receiving Country
              </Text>
              <Select
                control={control}
                onChange={(e: any) => {
                  setReceiverId(e.value);
                }}
                name="receiverId"
                placeholder="Receiving Country"
                options={country_options}
              />
            </HStack>
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
                <SimpleGrid columns={{ base: 1, sm: 1, md: 3 }}>
                  <GridItem colSpan={1}>
                    <VStack alignItems={"flex-start"} gap={"24px"}>
                      <HStack width={"100%"} spacing={3}>
                        <Text
                          color={colorScheme.search_icon}
                          fontSize="14px"
                          fontWeight={400}
                          display={"flex"}
                          w={"38%"}
                        >
                          Country Name
                          <Text marginLeft={"auto"} as={"span"}>
                            :
                          </Text>
                        </Text>
                        <Text
                          fontSize="14px"
                          color={colorScheme.gray_700}
                          fontWeight={600}
                        >
                          {countryById?.name ?? selectedCountry?.name}
                        </Text>
                      </HStack>
                      <HStack width={"100%"} spacing={3}>
                        <Text
                          color={colorScheme.search_icon}
                          fontSize="14px"
                          fontWeight={400}
                          display={"flex"}
                          w={"38%"}
                        >
                          Country Short Name
                          <Text marginLeft={"auto"} as={"span"}>
                            :
                          </Text>
                        </Text>
                        <Text
                          marginRight={"auto"}
                          fontSize="14px"
                          color={colorScheme.gray_700}
                          fontWeight={600}
                        >
                          {countryById?.shortName ?? selectedCountry?.shortName}
                        </Text>
                      </HStack>
                    </VStack>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <VStack alignItems={"flex-start"} gap={"24px"}>
                      <HStack width={"100%"} spacing={3}>
                        <Text
                          color={colorScheme.search_icon}
                          fontSize="14px"
                          fontWeight={400}
                          display={"flex"}
                          w={"38%"}
                        >
                          ISO Number
                          <Text marginLeft={"auto"} as={"span"}>
                            :
                          </Text>
                        </Text>
                        <Text
                          fontSize="14px"
                          color={colorScheme.gray_700}
                          fontWeight={600}
                        >
                          {countryById?.isoNumber ?? selectedCountry?.isoNumber}
                        </Text>
                      </HStack>
                      <HStack width={"100%"} spacing={3}>
                        <Text
                          color={colorScheme.search_icon}
                          fontSize="14px"
                          fontWeight={400}
                          display={"flex"}
                          w={"38%"}
                        >
                          Country Code
                          <Text marginLeft={"auto"} as={"span"}>
                            :
                          </Text>
                        </Text>
                        <Text
                          fontSize="14px"
                          color={colorScheme.gray_700}
                          fontWeight={600}
                        >
                          {countryById?.code ?? selectedCountry?.code}
                        </Text>
                      </HStack>
                    </VStack>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <VStack alignItems={"flex-start"} gap={"24px"}>
                      <HStack width={"100%"} spacing={3}>
                        <Text
                          color={colorScheme.search_icon}
                          fontSize="14px"
                          fontWeight={400}
                          display={"flex"}
                          w={"38%"}
                        >
                          Phone Code
                          <Text marginLeft={"auto"} as={"span"}>
                            :
                          </Text>
                        </Text>
                        <Text
                          fontSize="14px"
                          color={colorScheme.gray_700}
                          fontWeight={600}
                        >
                          {countryById?.phoneCode ?? selectedCountry?.phoneCode}
                        </Text>
                      </HStack>
                      <HStack width={"100%"} spacing={3}>
                        <Text
                          color={colorScheme.search_icon}
                          fontSize="14px"
                          fontWeight={400}
                          display={"flex"}
                          w={"38%"}
                        >
                          Base Rate
                          <Text marginLeft={"auto"} as={"span"}>
                            :
                          </Text>
                        </Text>
                        <Badge
                          borderRadius={"8px"}
                          padding="8px 24px"
                          backgroundColor={"#C4F1F9"}
                          color={"#007F96"}
                        >
                          {baseRateData?.data?.data?.baseRate
                            ? `${countryById?.currency?.shortName} ${baseRateData?.data?.data?.baseRate}`
                            : "---"}
                        </Badge>
                        <Icon
                          as={svgAssets.BaseRateConfig}
                          height={"24px"}
                          width={"24px"}
                          color={"#007F96"}
                          cursor={"pointer"}
                          onClick={() => {
                            onOpenAddBaseRateConfigModal();
                          }}
                        />
                      </HStack>
                    </VStack>
                  </GridItem>
                </SimpleGrid>
              </Box>
            </HStack>
            <HStack width={"60%"} alignItems={"flex-start"}>
              <Select
                control={control}
                name="marginType"
                placeholder="-Select Margin Type-"
                options={margin_type_options}
                required
              />
              <TextInput
                control={control}
                name="marginRate"
                label="Enter Margin Rate"
                type="number"
                required
              />
            </HStack>
            <HStack mt={2} justifyContent={"space-between"}>
              <Button
                minW={"max-content"}
                variant="filter"
                mr={1}
                onClick={() => stepProps.prevStep()}
              >
                Previous
              </Button>
              <Button
                minW={"max-content"}
                type="submit"
                isLoading={isAddLoading}
              >
                Save and Proceed
              </Button>
            </HStack>
          </Stack>
        </CardBody>
      </Card>

      <AddBaseRate
        baseRate={baseRateData?.data?.data?.baseRate ?? null}
        senderId={Number(searchParams.get("countryId"))}
        receiverId={receiverId ?? null}
        countryId={selectedCountry?.id ?? null}
        baseRateConfigId={baseRateConfigId}
        setBaseRateConfigId={setBaseRateConfigId}
        // data={tableData}
        isOpen={isOpenAddBaseRateConfigModal}
        onClose={onCloseAddBaseRateConfigModal}
      />
    </Flex>
  );
};

export default BaseRate;
