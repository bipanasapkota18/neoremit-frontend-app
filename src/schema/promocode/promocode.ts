import * as yup from "yup";

const promocodeSchema = yup.object().shape({
  name: yup.string().required("Please enter occupation name"),
  code: yup.string().required("Please enter occupation code"),
  validFrom: yup.string().required("Please enter valid from date"),
  validTo: yup.string(),
  doesExpire: yup.boolean(),
  hasUsageLimit: yup.boolean(),
  capAmount: yup.number(),
  deductionFrom: yup.string(),
  payoutMethodList: yup.array(),
  countryList: yup.array(),
  usageLimit: yup.number(),
  marginDiscountType: yup.string(),
  marginDiscountValue: yup.number(),
  transactionFeeDiscountType: yup.string(),
  transactionFeeDiscountValue: yup.number(),
  description: yup.string(),
  isActive: yup.boolean()
});

export default promocodeSchema;
