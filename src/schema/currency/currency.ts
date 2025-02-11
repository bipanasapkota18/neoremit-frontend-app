import * as yup from "yup";

const currencySchema = yup.object().shape({
  name: yup.string().required("Please enter currency Name"),
  shortName: yup.string().required("Please enter currency Short Name"),
  Symbol: yup.string().required("Please enter currency Symbol"),
  code: yup.string().required("Please enter currency Code")
});

export default currencySchema;
