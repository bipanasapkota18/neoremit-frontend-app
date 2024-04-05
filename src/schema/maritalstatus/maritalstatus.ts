import * as yup from "yup";

const maritalStatusSchema = yup.object().shape({
  name: yup.string().required("Please enter marital status name"),
  code: yup.string().required("Please enter marital status code"),
  isActive: yup.boolean()
});

export default maritalStatusSchema;
