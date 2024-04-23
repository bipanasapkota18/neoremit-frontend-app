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

  roles: yup
    .array()
    .min(1, "Select at least one Role")
    .required("Select at least one Role")
    .of(yup.object())
    .nullable()
});
export default userSchema;
