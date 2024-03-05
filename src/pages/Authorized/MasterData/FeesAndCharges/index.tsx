import {
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Switch,
  useBoolean,
  useMediaQuery
} from "@chakra-ui/react";
import { svgAssets } from "@neo/assets/images/svgs";
import BreadCrumb from "@neo/components/BreadCrumb";
import FilterButton from "@neo/components/Button/FilterButton";
import { DataTable } from "@neo/components/DataTable";
import TableActionButton from "@neo/components/DataTable/Action Buttons";
import SearchInput from "@neo/components/Form/SearchInput";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
import { useLocation } from "react-router-dom";
import AddFeeandCharges from "./AddFeeandCharges";

const FeeAndCharges = () => {
  const [flag, setFlag] = useBoolean();
  const { pathname } = useLocation();
  const [isDesktop] = useMediaQuery("(min-width: 1000px)");

  const onEditFeeAndCharges = () => {
    //
  };
  const onDeleteFeeAndCharges = () => {
    //
  };
  // const response = {
  //   status: true,
  //   message: "Media/Media Organisation Renewal list fetched successfully",
  //   data: {
  //     id: 1989,
  //     fiscalYear: 5,
  //     fiscalYearName: "2080/81",
  //     mediaOrganisationId: 611,
  //     mediaOrganisationName: "team television pvt.ltd",
  //     mediaOrganisationNameN: "टिम टेलिभिजन प्रा लि",
  //     approvalStatus: "VERIFY",
  //     submittedDate: 1704975686872,
  //     verifiedDate: 1705215122929,
  //     rejectedDate: 1696994515323,
  //     verifiedBy: 70,
  //     rejectedBy: 8698,
  //     filesDtoList: [
  //       {
  //         documentTypeMasterId: 68,
  //         documentTypeMasterName: "Tax Clearance Certificate",
  //         parentTableId: null,
  //         multipartFile: null,
  //         documentId: 50416,
  //         processName: "MEDIA_ORGANISATION_REGISTRATION",
  //         maxFileSize: 3,
  //         documentName: "Tax Clearance Certificate",
  //         documentNameNep:
  //           "अघिल्लो आर्थिक वर्षको कर चुक्ता प्रमाणपत्रको प्रतिलिपि",
  //         acceptedMimeTypeList: ["pdf"],
  //         fileName: "car chukta.pdf",
  //         filePath: "Uploads/d1a64574_car_chukta.pdf",
  //         organization: false,
  //         mediaRenewalId: 1989,
  //         mediaLabel: "team television pvt.ltd",
  //         required: true
  //       },
  //       {
  //         documentTypeMasterId: 17,
  //         documentTypeMasterName: "Audit Report",
  //         parentTableId: null,
  //         multipartFile: null,
  //         documentId: 50420,
  //         processName: "MEDIA_ORGANISATION_REGISTRATION",
  //         maxFileSize: 5,
  //         documentName: "Audit Report",
  //         documentNameNep: "लेखापरिक्षण प्रतिवेदन",
  //         acceptedMimeTypeList: ["pdf"],
  //         fileName: "Teamtv Hetauda Audit_1_11zon.pdf",
  //         filePath: "Uploads/320d883c_Teamtv_Hetauda_Audit_1_11zon.pdf",
  //         organization: false,
  //         mediaRenewalId: 1989,
  //         mediaLabel: "team television pvt.ltd",
  //         required: true
  //       }
  //     ],
  //     childMediaRenewDtoList: [
  //       {
  //         id: 1987,
  //         mediaId: 213,
  //         mediaName: "team television pvt .ltd.",
  //         mediaNameN: "टिम टेलिभिजन प्रा लि",
  //         fiscalYear: 5,
  //         fiscalYearName: "2080/81",
  //         approvalStatus: "DRAFT",
  //         filesDtoList: [
  //           {
  //             documentTypeMasterId: 99,
  //             documentTypeMasterName:
  //               "Permission Letter [Including Renew Page]",
  //             parentTableId: null,
  //             multipartFile: null,
  //             documentId: 50421,
  //             processName: "WELFARE_APPLICATION_TV",
  //             maxFileSize: 3,
  //             documentName: "Permission Letter [Including Renew Page]",
  //             documentNameNep:
  //               "अनुमति पत्र वा इजाजत पत्र  नविकरण भएको देखिने गरी  ",
  //             acceptedMimeTypeList: ["pdf", "png", "jpeg", "jpg"],
  //             fileName: "ijajat patra team tv.pdf",
  //             filePath: "Uploads/8fba5eeb_ijajat_patra_team_tv.pdf",
  //             organization: false,
  //             mediaRenewalId: 1987,
  //             mediaLabel: "team television pvt .ltd.",
  //             required: true
  //           },
  //           {
  //             documentTypeMasterId: 95,
  //             documentTypeMasterName: "Licence Document [Including Renew Page]",
  //             parentTableId: null,
  //             multipartFile: null,
  //             documentId: 50422,
  //             processName: "WELFARE_APPLICATION_TV",
  //             maxFileSize: 3,
  //             documentName: "Licence Document [Including Renew Page]",
  //             documentNameNep: "लाइसेन्स नविकरण भएको देखिने गरी",
  //             acceptedMimeTypeList: ["pdf", "png", "jpeg", "jpg"],
  //             fileName: "ijajat patra team tv.pdf",
  //             filePath: "Uploads/ebc38475_ijajat_patra_team_tv.pdf",
  //             organization: false,
  //             mediaRenewalId: 1987,
  //             mediaLabel: "team television pvt .ltd.",
  //             required: true
  //           }
  //         ],
  //         certificate:
  //           "System/MEDIA_RENEW/team television pvt .ltd._approve_certificate_bdd34a03-cc08-4001-b744-8d4e0fd542cc_tv_approve_certificate.pdf"
  //       },
  //       {
  //         id: 1988,
  //         mediaId: 806,
  //         mediaName: "Team Television Pvt Ltd",
  //         mediaNameN: "टिम टेलिभिजन प्रा लि",
  //         fiscalYear: 5,
  //         fiscalYearName: "2080/81",
  //         approvalStatus: "DRAFT",
  //         filesDtoList: [
  //           {
  //             documentTypeMasterId: 99,
  //             documentTypeMasterName:
  //               "Permission Letter [Including Renew Page]",
  //             parentTableId: null,
  //             multipartFile: null,
  //             documentId: 50423,
  //             processName: "WELFARE_APPLICATION_TV",
  //             maxFileSize: 3,
  //             documentName: "Permission Letter [Including Renew Page]",
  //             documentNameNep:
  //               "अनुमति पत्र वा इजाजत पत्र  नविकरण भएको देखिने गरी  ",
  //             acceptedMimeTypeList: ["pdf", "png", "jpeg", "jpg"],
  //             fileName: "ijajat patra team tv.pdf",
  //             filePath: "Uploads/c6d20983_ijajat_patra_team_tv.pdf",
  //             organization: false,
  //             mediaRenewalId: 1988,
  //             mediaLabel: "Team Television Pvt Ltd",
  //             required: true
  //           },
  //           {
  //             documentTypeMasterId: 95,
  //             documentTypeMasterName: "Licence Document [Including Renew Page]",
  //             parentTableId: null,
  //             multipartFile: null,
  //             documentId: 50424,
  //             processName: "WELFARE_APPLICATION_TV",
  //             maxFileSize: 3,
  //             documentName: "Licence Document [Including Renew Page]",
  //             documentNameNep: "लाइसेन्स नविकरण भएको देखिने गरी",
  //             acceptedMimeTypeList: ["pdf", "png", "jpeg", "jpg"],
  //             fileName: "ijajat patra team tv.pdf",
  //             filePath: "Uploads/10e01c39_ijajat_patra_team_tv.pdf",
  //             organization: false,
  //             mediaRenewalId: 1988,
  //             mediaLabel: "Team Television Pvt Ltd",
  //             required: true
  //           }
  //         ],
  //         certificate:
  //           "System/MEDIA_RENEW/Team Television Pvt Ltd_approve_certificate_bd7f8fb2-1a83-4cf8-bc2d-2d4c8f385e62_tv_approve_certificate.pdf"
  //       }
  //     ],
  //     rejectRemarks:
  //       "नमस्कार\nहजुरको दुइवटा मिडिया भएकोले भू-सतहि टेलिभिजनको विवरणहरु समेत संलग्न गरिदिनु हुन अनुरोध छ ।"
  //   }
  // };
  // console.log(response?.data?.id);
  // console.log(
  //   response?.data?.childMediaRenewDtoList?.map((item: any) => item.mediaId)
  // );
  const tableData = [
    {
      sn: 1,
      name: "Nepali Rupee",
      country: "Nepal",
      payoutMethod: "Bank",
      status: "Active"
    },
    {
      sn: 2,
      name: "US Dollar",
      country: "Nepal",
      payoutMethod: "Bank",
      status: "Active"
    },
    {
      sn: 3,
      name: "Euro",
      country: "Nepal",
      payoutMethod: "Bank",
      status: "Active"
    },
    {
      sn: 4,
      name: "British Pound",
      country: "Nepal",
      payoutMethod: "Bank",
      status: "Active"
    },
    {
      sn: 5,
      name: "Australian Dollar",
      country: "Nepal",
      payoutMethod: "Bank",
      status: "InActive"
    }
  ];
  const columns = [
    {
      header: "S.N",
      accessorKey: "sn"
    },
    {
      header: "Fee Name",
      accessorKey: "name",
      size: 40
    },
    {
      header: "Country",
      accessorKey: "country",
      size: 30
    },
    {
      header: "Payout Method",
      accessorKey: "payoutMethod",
      size: 20
    },
    {
      header: "Status",
      accessorKey: "status",
      size: 20,
      cell: (data: any) => {
        return (
          <Switch
            size="lg"
            isChecked={data?.row?.original?.status === "Active"}
          />
        );
      }
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: () => {
        return (
          <HStack>
            <TableActionButton
              onClickAction={onEditFeeAndCharges}
              icon={<svgAssets.EditButton />}
              label="Edit"
            />
            <TableActionButton
              onClickAction={onDeleteFeeAndCharges}
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
      <BreadCrumb
        currentPage={flag ? "Fee and Charges Setup" : "Fee and Charges"}
        options={activePath}
      />
      <Card
        borderRadius={"16px"}
        boxShadow="0px 4px 18px 0px rgba(0, 0, 0, 0.03)"
      >
        <CardBody>
          {flag ? (
            <AddFeeandCharges
              onClose={() => {
                setFlag.off();
              }}
            />
          ) : (
            <>
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

                  <FilterButton
                    onClick={() => {
                      //
                    }}
                  />
                </HStack>
                <Button
                  minW={"max-content"}
                  leftIcon={<svgAssets.AddButton />}
                  onClick={setFlag.on}
                >
                  Add Fees and Charges
                </Button>
              </HStack>
              <DataTable
                pagination={{
                  manual: false
                }}
                data={tableData}
                columns={columns}
              />{" "}
            </>
          )}
        </CardBody>
      </Card>
    </Flex>
  );
};

export default FeeAndCharges;
