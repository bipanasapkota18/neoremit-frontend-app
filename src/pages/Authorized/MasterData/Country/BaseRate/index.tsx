// import {
//   Box,
//   Card,
//   CardBody,
//   Flex,
//   GridItem,
//   HStack,
//   Heading,
//   SimpleGrid,
//   Stack,
//   Text,
//   VStack
// } from "@chakra-ui/react";
// import Select from "@neo/components/Form/SelectComponent";
// import { useGetCountryList } from "@neo/services/MasterData/service-country";
// import { colorScheme } from "@neo/theme/colorScheme";
// import { formatSelectOptions } from "@neo/utility/format";
// import { useForm } from "react-hook-form";
// import { useLocation, useSearchParams } from "react-router-dom";
// import { IStepProps } from "../CountryDetails/AddCountry";
// // import AddState from "./AddState";

// export interface IBaseRateData {
//   id: number;
//   country: string;
//   baseRate: string;
// }
// const defaultValues = {
//   senderId: null,
//   receiverId: null,
//   marginType: null,
//   marginRate: null
// };

// const BaseRate = ({ stepProps }: IStepProps) => {
//   const { data: countryData } = useGetCountryList();
//   // const {
//   //   isOpen: isOpenAddStateModal,
//   //   onOpen: onOpenAddStateModal,
//   //   onClose: onCloseAddStateModal
//   // } = useDisclosure();
//   const country_options = formatSelectOptions({
//     data: countryData?.filter(country => country.canReceive),
//     valueKey: "id",
//     labelKey: "name"
//   });
//   // const [editId, setEditId] = useState(null as number | null);

//   const { control, handleSubmit, reset } = useForm({
//     defaultValues: defaultValues,
//     mode: "onChange"
//   });
//   const [searchParams, setSearchParams] = useSearchParams();
//   console.log(searchParams.get("countryId"));
//   const { state } = useLocation();
//   const selectedCountry = state?.countryData?.find(
//     (country: any) => country.id === state?.countryId
//   );

//   return (
//     <Flex direction={"column"} gap={"16px"}>
//       {/* <BreadCrumb currentPage="State Setup" options={activePath} /> */}
//       <Card
//         borderRadius={"32px"}
//         boxShadow="0px 4px 18px 0px rgba(0, 0, 0, 0.03)"
//       >
//         <CardBody>
//           <Stack as="form" flexDirection={"column"} gap={"24px"}>
//             <HStack
//               gap={"24px"}
//               alignItems={"flex-start"}
//               flexDirection={"column"}
//               width={"30%"}
//             >
//               <Text fontSize={"17px"} fontWeight={700}>
//                 Receiving Country
//               </Text>
//               <Select
//                 control={control}
//                 name="receiverId"
//                 placeholder="Receiving Country"
//                 options={country_options}
//               />
//             </HStack>
//             <HStack
//               display={"flex"}
//               flexDirection={"column"}
//               alignItems={"flex-start"}
//             >
//               <Heading
//                 fontSize="17px"
//                 fontStyle="normal"
//                 fontWeight={700}
//                 lineHeight="normal"
//                 color={"#2D3748"}
//               >
//                 Country Details
//               </Heading>
//               <Box
//                 padding={"24px"}
//                 gap={"20px"}
//                 bgColor={colorScheme.gray_50}
//                 width={"100%"}
//               >
//                 <SimpleGrid columns={{ base: 1, sm: 1, md: 4 }}>
//                   <GridItem colSpan={1}>
//                     <VStack alignItems={"flex-start"} gap={"24px"}>
//                       <HStack width={"100%"} spacing={3}>
//                         <Text
//                           color={colorScheme.search_icon}
//                           fontSize="14px"
//                           fontWeight={400}
//                           display={"flex"}
//                           w={"38%"}
//                         >
//                           Country Name
//                           <Text marginLeft={"auto"} as={"span"}>
//                             :
//                           </Text>
//                         </Text>
//                         <Text
//                           fontSize="14px"
//                           color={colorScheme.gray_700}
//                           fontWeight={600}
//                         >
//                           {selectedCountry?.name}
//                         </Text>
//                       </HStack>
//                       <HStack width={"100%"} spacing={3}>
//                         <Text
//                           color={colorScheme.search_icon}
//                           fontSize="14px"
//                           fontWeight={400}
//                           display={"flex"}
//                           w={"38%"}
//                         >
//                           Country Short Name
//                           <Text marginLeft={"auto"} as={"span"}>
//                             :
//                           </Text>
//                         </Text>
//                         <Text
//                           marginRight={"auto"}
//                           fontSize="14px"
//                           color={colorScheme.gray_700}
//                           fontWeight={600}
//                         >
//                           {selectedCountry?.shortName}
//                         </Text>
//                       </HStack>
//                     </VStack>
//                   </GridItem>
//                   <GridItem colSpan={1}>
//                     <VStack alignItems={"flex-start"} gap={"24px"}>
//                       <HStack width={"100%"} spacing={3}>
//                         <Text
//                           color={colorScheme.search_icon}
//                           fontSize="14px"
//                           fontWeight={400}
//                           display={"flex"}
//                           w={"38%"}
//                         >
//                           ISO Number
//                           <Text marginLeft={"auto"} as={"span"}>
//                             :
//                           </Text>
//                         </Text>
//                         <Text
//                           fontSize="14px"
//                           color={colorScheme.gray_700}
//                           fontWeight={600}
//                         >
//                           {selectedCountry?.isoNumber}
//                         </Text>
//                       </HStack>
//                       <HStack width={"100%"} spacing={3}>
//                         <Text
//                           color={colorScheme.search_icon}
//                           fontSize="14px"
//                           fontWeight={400}
//                           display={"flex"}
//                           w={"38%"}
//                         >
//                           Country Code
//                           <Text marginLeft={"auto"} as={"span"}>
//                             :
//                           </Text>
//                         </Text>
//                         <Text
//                           fontSize="14px"
//                           color={colorScheme.gray_700}
//                           fontWeight={600}
//                         >
//                           {selectedCountry?.code}
//                         </Text>
//                       </HStack>
//                     </VStack>
//                   </GridItem>
//                   <GridItem colSpan={1}>
//                     <VStack alignItems={"flex-start"} gap={"24px"}>
//                       <HStack width={"100%"} spacing={3}>
//                         <Text
//                           color={colorScheme.search_icon}
//                           fontSize="14px"
//                           fontWeight={400}
//                           display={"flex"}
//                           w={"38%"}
//                         >
//                           Phone Code
//                           <Text marginLeft={"auto"} as={"span"}>
//                             :
//                           </Text>
//                         </Text>
//                         <Text
//                           fontSize="14px"
//                           color={colorScheme.gray_700}
//                           fontWeight={600}
//                         >
//                           {selectedCountry?.phoneCode}
//                         </Text>
//                       </HStack>
//                       <HStack width={"100%"} spacing={3}>
//                         <Text
//                           color={colorScheme.search_icon}
//                           fontSize="14px"
//                           fontWeight={400}
//                           display={"flex"}
//                           w={"38%"}
//                         >
//                           Receiving Country
//                           <Text marginLeft={"auto"} as={"span"}>
//                             :
//                           </Text>
//                         </Text>
//                         <Text
//                           fontSize="14px"
//                           color={colorScheme.gray_700}
//                           fontWeight={600}
//                         >
//                           {selectedCountry?.currency?.name}
//                         </Text>
//                       </HStack>
//                     </VStack>
//                   </GridItem>
//                   <GridItem colSpan={1}>
//                     <VStack alignItems={"flex-start"} gap={"24px"}>
//                       <HStack width={"100%"} spacing={3}>
//                         <Text
//                           color={colorScheme.search_icon}
//                           fontSize="14px"
//                           fontWeight={400}
//                           display={"flex"}
//                           w={"38%"}
//                         >
//                           Phone Code
//                           <Text marginLeft={"auto"} as={"span"}>
//                             :
//                           </Text>
//                         </Text>
//                         <Text
//                           fontSize="14px"
//                           color={colorScheme.gray_700}
//                           fontWeight={600}
//                         >
//                           {selectedCountry?.phoneCode}
//                         </Text>
//                       </HStack>
//                       <HStack width={"100%"} spacing={3}>
//                         <Text
//                           color={colorScheme.search_icon}
//                           fontSize="14px"
//                           fontWeight={400}
//                           display={"flex"}
//                           w={"38%"}
//                         >
//                           Receiving Country
//                           <Text marginLeft={"auto"} as={"span"}>
//                             :
//                           </Text>
//                         </Text>
//                         <Text
//                           fontSize="14px"
//                           color={colorScheme.gray_700}
//                           fontWeight={600}
//                         >
//                           {selectedCountry?.currency?.name}
//                         </Text>
//                       </HStack>
//                     </VStack>
//                   </GridItem>
//                 </SimpleGrid>
//               </Box>
//             </HStack>
//             <HStack></HStack>
//           </Stack>
//         </CardBody>
//       </Card>

//       {/* <AddBaseRate
//         countryId={selectedCountry?.id ?? null}
//         editId={editId}
//         setEditId={setEditId}
//         data={tableData}
//         isOpen={isOpenAddStateModal}
//         onClose={() => {
//           onCloseAddStateModal();
//         }}
//       /> */}
//       {/* <ConfirmationModal
//         variant={"delete"}
//         buttonText={"Delete"}
//         title={"Are You Sure?"}
//         isLoading={isDeleteLoading}
//         onApprove={handleDelete}
//         message="Deleting will permanently remove this file from the system. This cannot be Undone."
//         isOpen={isOpenStateDeleteModal}
//         onClose={onCloseStateDeleteModal}
//       /> */}
//     </Flex>
//   );
// };

// export default BaseRate;
