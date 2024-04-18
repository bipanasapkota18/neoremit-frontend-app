import * as yup from "yup";

const baseRateSetupSchema = yup.object().shape({
  receiverId: yup.object().required("Select Receiver Country").nullable(),
  marginType: yup.object().required("Margin Type is required").nullable(),
  marginRate: yup
    .number()
    .typeError("Margin Rate is required")
    .required("Margin Rate is required")
});

export default baseRateSetupSchema;
