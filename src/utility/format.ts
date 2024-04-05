// export interface IFormatSelectOptionParams {
//   data: any;
//   labelKey: string;
//   labelHelper?: string;
//   valueKey: number | string;
//   defaultLabel?: string;
//   defaultValue?: any;
// }
export interface IFormatSelectOptionParams {
  data: any;
  labelKey: string;
  labelHelper?: string;
  valueKey: number | string;
  defaultLabel?: string;
  defaultValue?: any;
  withHelper?: boolean;
  withHelperDisplay?: boolean;
}

// export interface ISelectOptions<T extends number | string | boolean> {
//   label: string;
//   value: T;
// }

// export function formatSelectOptionsTyped<T extends number | string | boolean>({
//   data,
//   labelKey,
//   labelHelper,
//   valueKey,
//   defaultLabel,
//   defaultValue
// }: IFormatSelectOptionParams): ISelectOptions<T>[] {
//   const formattedData =
//     data?.map((item: any) => {
//       return {
//         label: `${item?.[labelKey]}${
//           labelHelper ? ` (${item?.[labelHelper]})` : ""
//         }`,
//         value: item?.[valueKey]
//       };
//     }) ?? [];

//   if (defaultLabel)
//     return [
//       { label: defaultLabel, value: defaultValue ?? null },
//       ...formattedData
//     ];
//   else return formattedData;
// }

// export function formatSelectOptions({
//   data,
//   labelKey,
//   labelHelper,
//   valueKey,
//   defaultLabel,
//   defaultValue
// }: IFormatSelectOptionParams) {
//   const formattedData =
//     data?.map((item: any) => {
//       return {
//         label: `${item?.[labelKey]}${
//           labelHelper ? ` (${item?.[labelHelper]})` : ""
//         }`,
//         value: item?.[valueKey]
//       };
//     }) ?? [];
//   if (defaultLabel)
//     return [
//       { label: defaultLabel, value: defaultValue ?? null },
//       ...formattedData
//     ];
//   else return formattedData;
// }
export interface ISelectOptions<T extends number | string | object> {
  label: string;
  value: T;
  helper?: string;
}
export function formatSelectOptions<T extends string | number | object>({
  data,
  labelKey,
  labelHelper,
  valueKey,
  defaultLabel,
  defaultValue,
  withHelper,
  withHelperDisplay
}: IFormatSelectOptionParams) {
  const formattedData =
    data?.map((item: any) => {
      const option: any = {
        label: item?.[labelKey],
        value: item?.[valueKey]
      };
      if (labelHelper) {
        if (withHelper) {
          option.helper = item?.[labelHelper];
        } else {
          option.label += ` (${item?.[labelHelper]})`;
          if (withHelperDisplay) {
            option.helper = item?.[labelHelper];
          }
        }
      }
      return option;
    }) ?? [];
  if (defaultLabel)
    return [
      { label: defaultLabel, value: defaultValue ?? null },
      ...formattedData
    ] as ISelectOptions<T>[];
  else return formattedData as ISelectOptions<T>[];
}
// Define the tickFormatter function
export const formatTick = (value: number | string): string => {
  const num = Math.abs(Number(value)) / 1.0;
  if (num >= 10000000) {
    return (num / 10000000).toFixed(1) + "C";
  } else if (num >= 100000) {
    return (num / 100000).toFixed(1) + "L";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num.toFixed(1);
  }
};

// Shorten month name
export const formatMonth = (value: string | number): string => {
  if (typeof value == "number" || value == "auto") return `${value}`;
  else return value.substring(0, 3);
};

export function formatFileSize(bytes: number): string {
  if (bytes === 0) {
    return "0 bytes";
  }

  const k = 1024;
  const sizes = ["bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}
