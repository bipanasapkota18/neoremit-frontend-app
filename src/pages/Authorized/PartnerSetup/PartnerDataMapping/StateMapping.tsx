import { Card, CardBody, Text, useDisclosure } from "@chakra-ui/react";
import { svgAssets } from "@neo/assets/images/svgs";
import { DataTable } from "@neo/components/DataTable";
import TableActionButton from "@neo/components/DataTable/Action Buttons";
import Select from "@neo/components/Form/SelectComponent";
import { useGetCountryList } from "@neo/services/MasterData/service-country";
import { useGetPartnerStateData } from "@neo/services/service-partner-data-mapping";
import {
  IPartnerResponse,
  useGetPartnerById
} from "@neo/services/service-partner-setup";
import { formatSelectOptions } from "@neo/utility/format";
import { CellContext, PaginationState } from "@tanstack/table-core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import AddDataMapping from "./AddDataMapping";

const StateMapping = () => {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const { state } = useLocation();
  const { data } = useGetPartnerById(state?.partnerId);

  const {
    isOpen: isAddDataMappingModalOpen,
    onClose: onCloseAddDataMappingModal,
    onOpen: onOpenAddDataMappingModal
  } = useDisclosure();
  const [editId, setEditId] = useState<number | null>(null);

  const { data: countryList } = useGetCountryList();
  const countryOptions = formatSelectOptions({
    data: countryList?.data?.data,
    valueKey: "code",
    labelKey: "name"
  });
  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: (cell: CellContext<IPartnerResponse, any>) => {
        return (
          <Text>
            {pageParams.pageIndex * pageParams.pageSize + cell?.row?.index + 1}
          </Text>
        );
      }
    },
    {
      header: "State Name",
      accessorKey: "stateName",
      size: 100
    },
    {
      header: "Partner State Code",
      accessorKey: "partnerStateCode"
    },
    {
      header: "Partner State Name",
      accessorKey: "partnerStateName",
      size: 100
    },

    {
      header: "Action",
      cell: (cell: CellContext<IPartnerResponse, any>) => {
        return (
          <TableActionButton
            onClickAction={() => {
              setEditId(cell?.row?.original?.id);
              onOpenAddDataMappingModal();
            }}
            icon={<svgAssets.EditButton />}
            label="Edit"
          />
        );
      },
      size: 100
    }
  ];

  const [searchText, setSearchText] = useState<string>("" as string);

  const [pageParams, setPageParams] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const { control, watch } = useForm();
  const { data: partnerStateData, isLoading } = useGetPartnerStateData(
    countryCode ?? null,
    data?.partnerCode ?? null
  );
  return (
    <>
      <Card>
        <CardBody display={"flex"} flexDir={"column"} gap={4}>
          <Select
            name="countryCode"
            control={control}
            placeholder="-Select Country-"
            options={countryOptions ?? []}
            onChange={() => {
              setCountryCode(watch("countryCode")?.value);
            }}
          />
          <DataTable
            isLoading={isLoading}
            filter={{
              globalFilter: searchText,
              setGlobalFilter: setSearchText
            }}
            pagination={{
              manual: false,
              pageParams: pageParams,
              onChangePagination: setPageParams
            }}
            data={partnerStateData ?? []}
            columns={columns}
          />
        </CardBody>
      </Card>
      <AddDataMapping
        editId={editId}
        setEditId={setEditId}
        isOpen={isAddDataMappingModalOpen}
        onClose={onCloseAddDataMappingModal}
      />
    </>
  );
};

export default StateMapping;
