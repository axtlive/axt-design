import { useEffect, useState } from "react";

/**
 * 自定义 Hook useDebounce
 * 用于输入框的防抖
 * @param value 要改变的值
 * @param delay 延时
 */
export default function useDebounce(value: any, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
