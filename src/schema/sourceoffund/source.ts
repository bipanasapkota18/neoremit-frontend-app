import * as yup from "yup";
const sourceSchema = yup.object().shape({
  name: yup.string().required("Please enter Source of Fund "),
  code: yup.string().required("Please enter  Source Code"),
  isActive: yup.boolean().nullable()
});

export default sourceSchema;
