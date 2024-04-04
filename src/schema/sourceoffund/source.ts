import * as yup from "yup";

const sourceSchema = yup.object().shape({
  name: yup.string().required("Please enter Purpose Name"),
  code: yup.string().required("Please enter Purpose Code"),
  isActive: yup.boolean().nullable()
});

export default sourceSchema;
