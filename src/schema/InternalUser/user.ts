import * as yup from "yup";

const userSchema = yup.object().shape({
  name: yup.string().required("Full Name is Required"),

  email: yup
    .string()
    .required("Please enter your email address.")
    .email("Invalid email format."),

  mobileNumber: yup
    .string()
    .min(10, "Phone number must be at least 10 digits")

    .required("Phone number is required")
    .matches(
      /^\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}$/,
      "Invalid phone number format"
    ),
  roles: yup
    .array()
    .min(1, "Select at least one Role")
    .required("Select at least one Role")
    .of(yup.object())
    .nullable()
});
export default userSchema;
