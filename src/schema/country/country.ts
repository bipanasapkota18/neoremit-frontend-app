import * as yup from "yup";

const countryAdd = yup.object().shape({
  name: yup.string().required("Please enter country Name"),
  code: yup.string().required("Please enter country Code"),
  isoNumber: yup.string().required("Please enter country ISONumber"),
  phoneCode: yup.string().required("Plese enter country Phone Code"),
  shortName: yup
    .string()
    .required("Please enter country Short Name")
    .test("length", "Enter a two digit short name", val => val.length === 2),
  currencyId: yup.mixed().nullable(),
  flagIcon: yup.string(),
  canReceive: yup.boolean(),
  canSend: yup.boolean(),
  isActive: yup.boolean(),
  hasState: yup.boolean()
});

export default countryAdd;
