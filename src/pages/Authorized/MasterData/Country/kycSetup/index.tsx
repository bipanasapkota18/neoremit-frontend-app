import {
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  HStack,
  Heading,
  Stack,
  Text
} from "@chakra-ui/react";
import CheckBox from "@neo/components/Form/Checkbox";
import {
  KeyField,
  useCountryFields,
  useFormFieldCreate,
  useGetFields
} from "@neo/services/MasterData/service-kyc";
import {
  categorizeAllKeyFields,
  categorizeKeyFields,
  convertToTitleCase
} from "@neo/utility/helper";
import React, { useEffect, useMemo } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { IStepProps } from "../CountryDetails/AddCountry";

interface IAllFields {
  header: string;
  fields: (KeyField & {
    isRequired: boolean;
    display: boolean;
    allowUpdate: boolean;
  })[];
}
[];
interface IKycFieldValues {
  header: string;
  fields: (KeyField & {
    isRequired: boolean;
    display: boolean;
    allowUpdate: boolean;
  })[];
}

function customSort(item: IAllFields): number {
  if (item.header === "PERSONAL_INFORMATION") {
    return 0;
  } else if (item.header === "ADDRESS_INFORMATION") {
    return 1;
  } else if (item.header === "DOCUMENT_INFORMATION") {
    return 2;
  } else {
    return 3;
  }
}

const KycSetup = ({ stepProps }: IStepProps) => {
  const [searchParams] = useSearchParams();

  const { data: allFields, mutateAsync: fetchAllFields } = useGetFields();

  const { data: countryFields, mutateAsync: mutateCountryFields } =
    useCountryFields();
  const { mutateAsync: mutateFormFieldCreate } = useFormFieldCreate();

  useEffect(() => {
    mutateCountryFields;
  });

  const fieldGroupData = useMemo(() => {
    return categorizeKeyFields(countryFields?.data?.data) ?? [];
  }, [countryFields]);

  const allFieldGroups = useMemo(() => {
    return categorizeAllKeyFields(allFields?.data?.data) ?? [];
  }, [allFields]);

  const { control, reset, handleSubmit } = useForm();
  useEffect(() => {
    if (allFieldGroups && fieldGroupData) {
      reset(
        allFieldGroups?.map(allFieldGroupItem => ({
          ...allFieldGroupItem,
          fields: allFieldGroupItem?.fields?.map(allFieldGroupField => ({
            ...allFieldGroupField,
            isRequired: !!fieldGroupData?.find(
              item =>
                item?.fields?.find(
                  field => field.keyField.id == allFieldGroupField.id
                )?.isRequired ?? false
            ),
            display: !!fieldGroupData?.find(
              item =>
                item?.fields?.find(
                  field => field.keyField.name == allFieldGroupField.name
                )?.display ?? false
            ),
            allowUpdate: !!fieldGroupData?.find(
              item =>
                item?.fields?.find(
                  field => field.keyField.name == allFieldGroupField.name
                )?.allowUpdate ?? false
            )
          }))
        })) as IKycFieldValues[]
      );
    }
  }, [allFieldGroups, fieldGroupData]);

  useEffect(() => {
    fetchData();
    fetchAllFields();
  }, []);
  const fetchData = async () => {
    try {
      await mutateCountryFields(searchParams.get("countryId"));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const onSubmit = async (data: FieldValues) => {
    const formFields = (data as IKycFieldValues[])
      ?.flatMap(item => item.fields)
      ?.map(item => {
        return {
          kycFormFieldId: item.id,
          shouldDisplay: item.display,
          isRequired: item.isRequired,
          allowUpdate: item.allowUpdate
        };
      });
    try {
      await mutateFormFieldCreate({
        data: formFields,
        id: Number(searchParams.get("countryId"))
      });
      stepProps.nextStep();
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };
  return (
    <Flex direction={"column"} gap={"16px"}>
      <Card borderRadius={"16px"}>
        <CardBody display={"flex"} flexDir={"column"} gap={"16px"}>
          <Stack
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            flexDirection={"column"}
            gap={"24px"}
          >
            {allFieldGroups
              ?.sort((a, b) => customSort(a) - customSort(b))
              ?.map((group, index) => {
                return (
                  <React.Fragment key={index}>
                    <HStack justifyContent="space-between">
                      <Heading fontSize={"17px"} fontWeight={"700"} flex={1}>
                        {convertToTitleCase(group.header)}
                      </Heading>

                      {index === 0 && (
                        <HStack w="40%" justifyContent={"space-evenly"}>
                          <text>Is Required ?</text>
                          <text>Display ?</text>
                          <text>Allow Update ?</text>
                        </HStack>
                      )}
                    </HStack>

                    {group?.fields

                      ?.sort((a, b) => a.displayOrder - b.displayOrder)

                      .map((field, fieldIndex) => {
                        return (
                          <React.Fragment key={field.id}>
                            <HStack
                              key={field.id}
                              justifyContent="space-between"
                            >
                              <Text flex={1}>{field.label}</Text>

                              <HStack w="42%" justifyContent={"space-evenly"}>
                                <CheckBox
                                  width="fit-content"
                                  control={control}
                                  borderColor="gray.400"
                                  name={`[${index}].fields[${fieldIndex}].isRequired`}
                                />
                                <CheckBox
                                  width="fit-content"
                                  control={control}
                                  borderColor="gray.400"
                                  name={`[${index}].fields[${fieldIndex}].display`}
                                />
                                <CheckBox
                                  width="fit-content"
                                  control={control}
                                  borderColor="gray.400"
                                  name={`[${index}].fields[${fieldIndex}].allowUpdate`}
                                />
                              </HStack>
                            </HStack>
                            <Divider />
                          </React.Fragment>
                        );
                      })}
                  </React.Fragment>
                );
              })}

            <HStack mt={2} justifyContent={"space-between"}>
              <Button
                variant="filter"
                mr={1}
                onClick={() => stepProps.prevStep()}
              >
                Previous
              </Button>

              <Button type="submit">Save and Proceed</Button>
            </HStack>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  );
};
export default KycSetup;
