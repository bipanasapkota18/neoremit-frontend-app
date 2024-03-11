import { debounce } from "lodash";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

export const useIsMounted = () => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
};

type IDebounce = {
  callback: (value: string) => void;
  value: any;
  delay?: number;
};
export const useDebouncedFunction = ({
  callback,
  value,
  delay = 1000
}: IDebounce) => {
  const [returnString, setReturnString] = useState();
  const [isDebouncing, setIsDebouncing] = useState(false);

  const debouncedSearchFunction = useCallback(
    (settingValue: string) => {
      callback(settingValue);
      setIsDebouncing(false);
    },
    [callback]
  );

  const debouncedCallback = useMemo(() => {
    return debounce(debouncedSearchFunction, delay);
  }, [debouncedSearchFunction, delay]);

  const handleChange = (e?: ChangeEvent<HTMLInputElement>) => {
    setIsDebouncing(true);
    const settingValue = e?.target?.value ?? value;
    setReturnString(settingValue);
    debouncedCallback(settingValue);
  };

  return { returnString, isDebouncing, handleChange };
};
export function trimObjectValues(
  obj: Record<string, any>
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (Array.isArray(value)) {
        result[key] = value; // No trimming for arrays, keep them as they are
      } else if (typeof value === "string") {
        result[key] = value.trim();
      } else if (typeof value === "object" && value !== null) {
        result[key] = trimObjectValues(value);
      } else {
        result[key] = value;
      }
    }
  }

  return result;
}
