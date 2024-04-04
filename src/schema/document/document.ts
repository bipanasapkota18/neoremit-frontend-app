import * as yup from "yup";

const documentSchema = yup.object().shape({
  documentName: yup.string().required("Please enter Document Name"),
  documentCode: yup.string().required("Please enter Document Code"),
  documentSize: yup
    .number()
    .typeError("Please enter Document number")
    .min(1, "Document size should be greater than 0"),
  allowedExtensions: yup
    .array()
    .min(1, "Select at least one extension")
    .required("Select at least one extension")
    .of(yup.object())
    .nullable()
});

export default documentSchema;
