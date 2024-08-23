import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import { svgAssets } from "@neo/assets/images/svgs";
import { sidebarAssets } from "@neo/assets/images/svgs/Sidebar";
import BreadCrumb from "@neo/components/BreadCrumb";
import { colorScheme } from "@neo/theme/colorScheme";
import CountryMapping from "./CountryMapping";
import StateMapping from "./StateMapping";

const PartnerDataMapping = () => {
  const activePath = [
    {
      label: "Home",
      href: "/"
    },
    {
      icon: sidebarAssets.Partners,
      href: "/partners",
      label: "Partner Setup"
    },
    {
      icon: svgAssets.PartnerDataMappingIcon,
      href: "/partners-data-mapping",
      label: "Partner Data Mapping"
    }
  ];

  const masterData = ["Country", "State", "Relationship", "Document Setup"];
  return (
    <Flex gap={6} direction={"column"}>
      <BreadCrumb currentPage="Partner Data Mapping" options={activePath} />
      {/* <HStack alignItems={"flex-start"} gap={4}>
        <Box
          p={3}
          backgroundColor={"#FFFFFF"}
          borderRadius={"16px"}
          width={"240px"}
          display={"flex"}
          flexDirection={"column"}
          gap={4}
        >
          {masterData.map((data, index) => (
            <Text
              cursor={"pointer"}
              fontWeight={800}
              px={4}
              py={3}
              key={index}
              borderBottom="1px solid var(--Neutral-Gray-100, #EDF2F7)"
              color={colorScheme.search_icon}
            >
              {data?.toUpperCase()}
            </Text>
          ))}
        </Box>
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
              data={PartnerData ?? []}
              columns={columns}
            />
          </CardBody>
        </Card>
      </HStack> */}
      <Tabs isManual variant="enclosed" size="md" gap={4} display={"flex"}>
        <Box
          p={3}
          backgroundColor={"#FFFFFF"}
          borderRadius={"16px"}
          width={"240px"}
          display={"flex"}
          flexDirection={"column"}
          gap={4}
          height={"max-content"}
        >
          <TabList display={"flex"} flexDirection={"column"}>
            {masterData.map((data, index) => (
              <Tab
                // _active={{
                //   backgroundColor: "white"
                // }}
                // _focus={{
                //   color: colorScheme.primary_500
                // }}
                cursor={"pointer"}
                fontWeight={800}
                px={4}
                py={3}
                key={index}
                borderBottom="1px solid var(--Neutral-Gray-100, #EDF2F7) !important"
                color={colorScheme.search_icon}
              >
                {data?.toUpperCase()}
              </Tab>
            ))}
          </TabList>
        </Box>

        <TabPanels>
          <TabPanel>
            <CountryMapping />
          </TabPanel>
          <TabPanel>
            <StateMapping />
          </TabPanel>
          <TabPanel>Three</TabPanel>
          <TabPanel>Four</TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default PartnerDataMapping;
