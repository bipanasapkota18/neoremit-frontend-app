import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Flex,
  GridItem,
  HStack,
  Heading,
  Select,
  SimpleGrid,
  Text,
  VStack
} from "@chakra-ui/react";
import {
  useCountryFields,
  useGetFields
} from "@neo/services/MasterData/service-kyc";
import React, { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { IStepProps } from "../CountryDetails/AddCountry";

const fieldGroups = [
  {
    heading: "Personal Information",
    fields: [
      {
        id: "fname",
        name: "First Name",
        isRequired: false,
        hide: false,
        allowUpdate: false
      },
      {
        id: "mname",
        name: "MiddleName",
        isRequired: false,
        hide: false,
        allowUpdate: false
      },
      {
        id: "lname",
        name: "LastName",
        isRequired: false,
        hide: false,
        allowUpdate: false
      },
      {
        id: "gender",
        name: "Gender",
        isRequired: false,
        hide: false,
        allowUpdate: false
      },
      {
        id: "dob",
        name: "Date of Birth",
        isRequired: "false",
        hide: "false",
        allowUpdate: "false"
      },
      {
        id: "email address",
        name: "Email Address",
        isRequired: "false",
        hide: "false",
        allowUpdate: "false"
      },
      {
        id: "dob",
        name: "Contact Number",
        isRequired: "false",
        hide: "false",
        allowUpdate: "false"
      },
      {
        id: "source of  funds",
        name: "Source Of Funds",
        isRequired: "false",
        hide: "false",
        allowUpdate: "false"
      },
      {
        id: "ssn no",
        name: "SSN Number",
        isRequired: "false",
        hide: "false",
        allowUpdate: "false"
      },
      {
        id: "occupation",
        name: "Occupation",
        isRequired: "false",
        hide: "false",
        allowUpdate: "false"
      }
    ]
  },
  {
    heading: "Address Information",
    fields: [
      {
        id: "state",
        name: "State",
        isRequired: false,
        hide: false,
        allowUpdate: false
      },
      {
        id: "city",
        name: "City",
        isRequired: false,
        hide: false,
        allowUpdate: false
      },
      {
        id: "streetAddress",
        name: "Street Address",
        isRequired: false,
        hide: false,
        allowUpdate: false
      },
      {
        id: "zipCode",
        name: "Zip code",
        isRequired: false,
        hide: false,
        allowUpdate: false
      }
    ]
  },
  {
    heading: "Document Details",
    fields: [
      {
        id: "docName",
        name: "Document Name",
        isRequired: false,
        hide: false,
        allowUpdate: false
      },
      {
        id: "docNumber",
        name: "Document Number",
        isRequired: false,
        hide: false,
        allowUpdate: false
      },
      {
        id: "issuedCountry",
        name: "Issued Country",
        isRequired: false,
        hide: false,
        allowUpdate: false
      },
      {
        id: "issuedState",
        name: "Issued State",
        isRequired: false,
        hide: false,
        allowUpdate: false
      },
      {
        id: "issuedDate",
        name: "Issued Date",
        isRequired: false,
        hide: false,
        allowUpdate: false
      },
      {
        id: "expiryDate",
        name: "Expiry Date",
        isRequired: false,
        hide: false,
        allowUpdate: false
      }
    ]
  }
];
const KycSetup = ({ stepProps }: IStepProps) => {
  const { state } = useLocation();

  const selectedCountry = state?.countryData?.find(
    (country: any) => country.id === state?.countryId
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const { mutateAsync: mutateCountryFields } = useCountryFields();
  const { mutateAsync: mutateFields } = useGetFields();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      await Promise.all([
        mutateCountryFields(selectedCountry?.id),
        mutateFields()
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Flex direction={"column"} gap={"16px"}>
      <Card borderRadius={"16px"}>
        <CardBody display={"flex"} flexDir={"column"} gap={"16px"}>
          <HStack
            gap={"24px"}
            alignItems={"flex-start"}
            flexDirection={"column"}
            width={"30%"}
          >
            <Select placeholder="-Required documents(multiple)-" />
          </HStack>

          {fieldGroups.map((group, index) => (
            <React.Fragment key={index}>
              <HStack justifyContent="space-between">
                <Heading fontSize={"17px"} fontWeight={"700"} flex={1}>
                  {group.heading}
                </Heading>
                {index === 0 && (
                  <HStack w="40%" justifyContent={"space-evenly"}>
                    <text>Is Required ?</text>
                    <text>Hide ?</text>
                    <text>Allow Update ?</text>
                  </HStack>
                )}
              </HStack>
              <SimpleGrid spacing={"4"}>
                {group.fields.map((field, fieldIndex) => (
                  <GridItem key={fieldIndex}>
                    <VStack
                      gap={"24px"}
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"flex-start"}
                    >
                      <HStack justifyContent={"space-between"} w="full">
                        <Text w="60%">{field.name}</Text>
                        <HStack w="42%" justifyContent={"space-evenly"}>
                          <Checkbox
                            defaultChecked={field.isRequired === "true"}
                          />
                          <Checkbox defaultChecked={field.hide === "true"} />
                          <Checkbox
                            defaultChecked={field.allowUpdate === "true"}
                          />
                        </HStack>
                      </HStack>
                    </VStack>
                  </GridItem>
                ))}
              </SimpleGrid>
            </React.Fragment>
          ))}

          <HStack mt={2} justifyContent={"space-between"}>
            {/* <Button minW={"max-content"} variant={"filter"}>
              Proceed
            </Button> */}
            <Button
              variant="filter"
              mr={1}
              onClick={() => stepProps.prevStep()}
            >
              Previous
            </Button>

            <Button
              onClick={() => {
                searchParams.get("countryId")
                  ? setSearchParams({
                      countryId:
                        searchParams.get("countryId") ?? selectedCountry?.id
                    })
                  : null;
                stepProps.nextStep();
              }}
            >
              Save and Proceed
            </Button>
          </HStack>
        </CardBody>
      </Card>
    </Flex>
  );
};
export default KycSetup;
