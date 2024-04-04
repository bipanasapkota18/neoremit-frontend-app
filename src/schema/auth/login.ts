import * as yup from "yup";

const loginSchema = yup.object().shape({
  password: yup.string().required("Please enter a password"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter email"),
  remember: yup.boolean()
});

export default loginSchema;
