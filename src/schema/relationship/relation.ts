import * as yup from "yup";

const relationshipSchema = yup.object().shape({
  name: yup.string().required("Please enter relationship Name"),
  code: yup.string().required("Please enter relationship Code")
});

export default relationshipSchema;
