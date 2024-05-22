import * as yup from "yup";

const ledgerHeadSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  shortCode: yup.string().required("Short Code is required"),
  currencyId: yup.object().required("Currency ID is required").nullable(),
  description: yup.string().required("description is required")
});

export default ledgerHeadSchema;
