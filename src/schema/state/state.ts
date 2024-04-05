import * as yup from "yup";

const stateSchema = yup.object().shape({
  name: yup.string().required("Please enter State Name"),
  code: yup.string().required("Please enter State Code")
});

export default stateSchema;
