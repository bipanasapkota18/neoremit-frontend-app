import * as yup from "yup";

const baseRateSchema = yup.object().shape({
  isAutomatic: yup.string(),
  baseRate: yup
    .number()
    .when("isAutomatic", {
      is: (value: string) => value === "Yes", // Condition for validation
      then: yup.number().typeError("Please Enter Base Rate")
    })
    .nullable()
});

export default baseRateSchema;
