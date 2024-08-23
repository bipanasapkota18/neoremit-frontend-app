import {
  Card,
  CardBody,
  HStack,
  Text,
  useDisclosure,
  useMediaQuery
} from "@chakra-ui/react";
import { svgAssets } from "@neo/assets/images/svgs";
import FilterButton from "@neo/components/Button/FilterButton";
import { DataTable } from "@neo/components/DataTable";
import TableActionButton from "@neo/components/DataTable/Action Buttons";
import SearchInput from "@neo/components/Form/SearchInput";
import { useGetAllPartnerData } from "@neo/services/service-partner-data-mapping";
import {
  IPartnerResponse,
  useGetPartnerById
} from "@neo/services/service-partner-setup";
import { CellContext, PaginationState } from "@tanstack/table-core";
import { useState } from "react";
import { useLocation } from "react-router";
import AddDataMapping from "./AddDataMapping";

const CountryMapping = () => {
  const { state } = useLocation();
  const { data } = useGetPartnerById(state?.partnerId);
  const { data: partnerCoutnries, isLoading } = useGetAllPartnerData(
    data?.partnerCode ?? null
  );
  const {
    isOpen: isAddDataMappingModalOpen,
    onClose: onCloseAddDataMappingModal,
    onOpen: onOpenAddDataMappingModal
  } = useDisclosure();
  const [editId, setEditId] = useState<number | null>(null);

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
      header: "Country Name",
      accessorKey: "countryName",
      size: 100
    },
    {
      header: "Partner Country Code",
      accessorKey: "partnerCountryCode"
    },
    {
      header: "ISO2",
      accessorKey: "iso2"
    },
    {
      header: "ISO3",
      accessorKey: "iso3"
    },

    {
      header: "Partner Data",
      accessorKey: "localCurrency",
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
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");

  const [searchText, setSearchText] = useState<string>("" as string);

  const [pageParams, setPageParams] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  return (
    <>
      <Card width={"100%"}>
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
                  onSearch={setSearchText}
                  type="text"
                />
              ) : (
                ""
              )}

              <FilterButton
                onClick={() => {
                  //
                }}
              />
            </HStack>
          </HStack>
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
            data={partnerCoutnries ?? []}
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

export default CountryMapping;
