import * as yup from "yup";

const maritalStatusSchema = yup.object().shape({
  name: yup.string().required("Please enter occupation name"),
  code: yup.string().required("Please enter occupation code"),
  isActive: yup.boolean()
});

export default maritalStatusSchema;
