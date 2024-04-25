import * as yup from "yup";

const userSchema = yup.object().shape({
  name: yup.string().required("Full Name is Required"),

  email: yup
    .string()
    .required("Please enter your email address.")
    .email("Invalid email format."),

  mobileNumber: yup
    .string()
    .required("Phone number is required.")
    .min(10, "Mobile number must be at least 10 digits.")
    .max(10, "Mobile number cannot exceed 10 digits."),

  roles: yup.object().required("Select at least one Role").nullable()
});
export default userSchema;
