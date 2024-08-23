import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "@neo/components/Form/TextInput";
import Modal from "@neo/components/Modal";
import {
  useGetPartnerCountryDataById,
  useSaveCountryMapping
} from "@neo/services/service-partner-data-mapping";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface AddDataMappingProps {
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  isOpen: boolean;
  onClose: () => void;
}
const defaultValues = {
  partnerCountryName: "",
  partnerCountryCode: "",
  partnerCode: "",
  iso2: "",
  iso3: ""
};

const AddDataMapping = ({
  isOpen,
  onClose,
  editId,
  setEditId
}: AddDataMappingProps) => {
  const { data: partnerCountryData } = useGetPartnerCountryDataById(editId);
  const { mutateAsync: mutateCountryMapping, isLoading: isAddLoading } =
    useSaveCountryMapping();

  // const { data } = useGetAllPartnerCountries();

  const schema = yup.object().shape({
    partnerCountryName: yup.string().required("Country Name is required"),
    partnerCountryCode: yup.string().required("Country Code is required"),
    partnerCode: yup.string().required("Partner Code is required"),
    iso2: yup.string().required("ISO2 is required"),
    iso3: yup.string().required("ISO3 is required")
  });
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (partnerCountryData) {
      reset({
        partnerCountryName: partnerCountryData?.partnerCountryName,
        partnerCountryCode: partnerCountryData?.partnerCountryCode,
        partnerCode: partnerCountryData?.partnerCode,
        iso2: partnerCountryData?.iso2,
        iso3: partnerCountryData?.iso3
      });
    }
  }, [partnerCountryData]);

  const onAddDataMapping = async (data: typeof defaultValues) => {
    try {
      await mutateCountryMapping({
        ...data,
        id: editId
      });
    } catch (error) {
      console.error(error);
    }
    handleCloseModal();
  };
  const handleCloseModal = () => {
    setEditId(null);
    reset(defaultValues);
    onClose();
  };
  return (
    <>
      <Modal
        size={"xl"}
        width="650px"
        isOpen={isOpen}
        onClose={handleCloseModal}
        submitButtonText="Save"
        cancelButtonText="Cancel"
        title={
          editId ? "Edit Coutnry Data Mapping" : "Add Coutnry Data Mapping"
        }
        onSubmit={handleSubmit(onAddDataMapping)}
        isSubmitting={isAddLoading}
      >
        <SimpleGrid columns={2} gap={"30px"}>
          <GridItem colSpan={1}>
            <TextInput
              name="partnerCountryName"
              label="Enter Partner Country Name"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={1}>
            <TextInput
              name="partnerCountryCode"
              label="Enter Partner Country Code"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              name="partnerCode"
              label="Enter Partner Code"
              control={control}
              type="text"
              isRequired
              isDisabled
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              name="iso2"
              label="Enter ISO2 Code"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
          <GridItem colSpan={2}>
            <TextInput
              name="iso3"
              label="Enter ISO3 Code"
              control={control}
              type="text"
              isRequired
            />
          </GridItem>
        </SimpleGrid>
      </Modal>
    </>
  );
};

export default AddDataMapping;
