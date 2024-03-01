import * as yup from "yup";

const loginSchema = yup.object().shape({
  password: yup.string().required("Please enter password"),
  email: yup.string().required("Please enter email address"),
  remember: yup.boolean()
});

export default loginSchema;
