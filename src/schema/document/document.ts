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
    .of(yup.mixed())
    .min(1, "Please select at least one extension")
});

export default documentSchema;
