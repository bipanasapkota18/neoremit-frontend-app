import * as yup from "yup";

const userSchema = yup.object().shape({
  name: yup.string().required("Full Name is Required"),
  email: yup.string().required(" Enter Valid email"),
  mobileNumber: yup.string().required("Enter Valid Phone Number"),
  roles: yup
    .array()
    .min(1, "Select at least one Role")
    .required("Select at least one Role")
    .of(yup.object())
    .nullable()
});
export default userSchema;
