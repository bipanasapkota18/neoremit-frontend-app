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
