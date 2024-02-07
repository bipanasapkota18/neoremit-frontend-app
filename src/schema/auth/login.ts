import * as yup from "yup";

const loginSchema = yup.object().shape({
  password: yup.string().required("errors.password_required"),
  email: yup.string().required("errors.email_required"),
  remember: yup.boolean()
});

export default loginSchema;
