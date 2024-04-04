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
  SimpleGrid,
  useDisclosure,
  useMediaQuery
} from "@chakra-ui/react";

import { svgAssets } from "@neo/assets/images/svgs";
import { DataTable } from "@neo/components/DataTable";
import TableActionButton from "@neo/components/DataTable/Action Buttons";
import SearchInput from "@neo/components/Form/SearchInput";
import Select from "@neo/components/Form/SelectComponent";
import TextInput from "@neo/components/Form/TextInput";
import ConfirmationModal from "@neo/components/Modal/DeleteModal";
import {
  CountriesList,
  useGetCountryList
} from "@neo/services/MasterData/service-country";
import {
  FeeAndChargesDetail,
  IFeeAndChargeResponse,
  useAddFeesAndCharges,
  useFeeAndChargesDetailDelete,
  useGetFeeAndChargesbyId,
  useUpdateFeesAndCharges
} from "@neo/services/service-fees-and-charges";
import { ISelectOptions, formatSelectOptions } from "@neo/utility/format";
import { CellContext } from "@tanstack/react-table";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AddFeeAndChargesDetails from "./AddFeeAndChargesDetails";

const defaultValues = {
  feeName: "",
  countryId: null as ISelectOptions<number> | null,
  currencyId: null as ISelectOptions<number> | null
};
interface AddFeeandChargesProps {
  onClose: () => void;
  editId: number | null;
  data: IFeeAndChargeResponse[] | undefined;
  setEditId: Dispatch<SetStateAction<number | null>>;
}
const AddFeeandCharges = ({
  onClose,
  editId,
  data: editData,
  setEditId
}: AddFeeandChargesProps) => {
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: defaultValues
  });
  const { mutateAsync: mutateAddFeeandCharges } = useAddFeesAndCharges();
  const { mutateAsync: mutateUpdateFeeandCharges } = useUpdateFeesAndCharges();
  const { mutateAsync: mutateDeleteFeeAndCharges, isLoading: isDeleteLoading } =
    useFeeAndChargesDetailDelete();
  const {
    isOpen: isOpenAddDetailModal,
    onOpen: onOpenAddDetailModal,
    onClose: onModalClose
  } = useDisclosure();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");
  const [editDetailId, setEditDetailId] = useState<number | null>(null);
  const { data: countryData } = useGetCountryList();
  const { data: feeAndChargeDetails, isLoading: isGetFeeAndChargesLoading } =
    useGetFeeAndChargesbyId(editId);
  const countryOptions = formatSelectOptions({
    data: countryData,
    valueKey: "id",
    labelKey: "name"
  });

  const {
    isOpen: isOpenFeeAndChargeDeleteModal,
    onOpen: onOpenFeeAndChargeDeleteModal,
    onClose: onCloseFeeAndChargeDeleteModal
  } = useDisclosure();
  useEffect(() => {
    if (editId) {
      const selectedFee = editData?.find(data => data.id === editId);

      const selectedCountry = countryData?.find((country: any) => {
        return selectedFee?.country?.name === country?.name;
      })?.name;
      reset({
        feeName: selectedFee?.feeName,
        countryId: selectedCountry
      });
    }
  }, [editId, editData, countryData]);

  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: (cell: CellContext<FeeAndChargesDetail, any>) => {
        return cell?.row?.index + 1;
      }
    },
    {
      header: "Payment Method",
      accessorKey: "payoutMethods",
      size: 100,
      cell: (data: CellContext<FeeAndChargesDetail, any>) => {
        return data?.row?.original?.payoutMethods?.map(
          (item: any, index: number) => {
            return (
              <Badge
                key={index}
                padding="8px 24px"
                mx={2}
                borderRadius={"16px"}
              >
                {item?.name}
              </Badge>
            );
          }
        );
      }
    },
    {
      header: "Fee and Charge Type",
      accessorKey: "feeAndChargeType"
    },
    {
      header: "Fee",
      accessorKey: "fee"
    },
    {
      header: "Action",
      accessorKey: "action",

      cell: (cell: CellContext<IFeeAndChargeResponse, any>) => {
        return (
          <HStack>
            <TableActionButton
              onClickAction={() => {
                setEditDetailId(cell?.row?.original?.id ?? null);
                onOpenAddDetailModal();
              }}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={() => {
                setEditDetailId(cell?.row?.original?.id ?? null);
                onOpenFeeAndChargeDeleteModal();
              }}
              icon={<svgAssets.DeleteButton />}
              label="Delete"
            />
          </HStack>
        );
      }
    }
  ];
  const handleDelete = async () => {
    try {
      await mutateDeleteFeeAndCharges(editDetailId);
      // setEditId(null);
      onCloseFeeAndChargeDeleteModal();
    } catch (e) {
      console.error(e);
    }
  };
  const handleSaveFeeandCharges = async (data: typeof defaultValues) => {
    if (editId) {
      const selectedFee = editData?.find(data => data.id === editId);
      await mutateUpdateFeeandCharges({
        id: editId,
        ...data,
        countryId: selectedFee?.country?.id ?? "",
        currencyId: selectedFee?.currencyDetailResponseDto?.id ?? "",
        feeAndChargesDetails:
          feeAndChargeDetails?.data?.data?.feeAndChargesDetails ?? []
      });
    } else {
      await mutateAddFeeandCharges({
        ...data,
        countryId: data.countryId?.value ?? "",
        currencyId: countryData?.find(
          (country: CountriesList) => data.countryId?.label === country?.name
        )?.currency?.id,
        feeAndChargesDetails: []
      });
    }
    onClose();
    reset();
    setEditId(null);
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
                <SimpleGrid columns={{ sm: 1, md: 1, lg: 3 }} spacing={10}>
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
                      name="countryId"
                      placeholder="Country"
                      control={control}
                      options={countryOptions ?? []}
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <TextInput
                      control={control}
                      name="currencyId"
                      label="Currency"
                      type="text"
                      isRequired
                      isReadOnly
                      value={
                        watch("countryId")
                          ? countryData?.find((country: CountriesList) => {
                              return (
                                watch("countryId")?.label === country?.name
                              );
                            })?.currency?.name
                          : ""
                      }
                    />
                  </GridItem>
                </SimpleGrid>
              </Box>
            </HStack>
            {editId ? (
              <>
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
                        onClick={onOpenAddDetailModal}
                      >
                        Add Fee and Charges Details
                      </Button>
                    </HStack>

                    <DataTable
                      isLoading={isGetFeeAndChargesLoading}
                      pagination={{
                        manual: false
                      }}
                      data={
                        feeAndChargeDetails?.data?.data?.feeAndChargesDetails ??
                        []
                      }
                      columns={columns}
                    />
                  </CardBody>
                </Card>
              </>
            ) : null}

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
                onClick={() => {
                  setEditId(null);
                  onClose();
                }}
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
          EditDetailId={editDetailId}
          setEditDetailId={setEditDetailId}
          data={feeAndChargeDetails?.data?.data}
          isOpen={isOpenAddDetailModal}
          onClose={() => {
            setEditDetailId(null);
            onModalClose();
          }}
        />
      </form>
      <ConfirmationModal
        variant={"delete"}
        buttonText={"Delete"}
        title={"Are You Sure?"}
        isLoading={isDeleteLoading}
        onApprove={handleDelete}
        message="Deleting will permanently remove this file from the system. This cannot be Undone."
        isOpen={isOpenFeeAndChargeDeleteModal}
        onClose={onCloseFeeAndChargeDeleteModal}
      />
    </Flex>
  );
};

export default AddFeeandCharges;
