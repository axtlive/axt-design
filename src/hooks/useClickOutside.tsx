import { RefObject, useEffect } from "react";

/**
 * 自定义 Hook useClickOutside
 * 用于点击其他地方而执行的函数
 * @param ref 元素 RefObject<HTMLElement>
 * @param handler 处理函数 Function
 */
export default function useClickOutside(
  ref: RefObject<HTMLElement>,
  handler: Function,
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}
