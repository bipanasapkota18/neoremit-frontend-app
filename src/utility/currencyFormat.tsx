import { Text } from "@chakra-ui/react";

export const currencyFormat = (value: number, returnValue?: boolean) => {
  const currency = Number(value?.toFixed(2));
  const toNepaliFormat = currency.toLocaleString("hi-IN");
  const formattedCurrency = toNepaliFormat.includes(".")
    ? toNepaliFormat.split(".")[1].length === 1
      ? toNepaliFormat.concat("0")
      : toNepaliFormat
    : toNepaliFormat.concat(".00");

  return returnValue ? (
    formattedCurrency
  ) : (
    <>
      <Text textAlign={"right"}>{formattedCurrency}</Text>{" "}
    </>
  );
};
