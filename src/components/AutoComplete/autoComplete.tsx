import React, {
  FC,
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  ReactElement,
  KeyboardEvent,
} from "react";
import classNames from "classnames";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";

import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";

interface DataSourceObject {
  value: string;
  name?: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  /**
   * @description 返回输入建议的方法 可以拿到当前的输入 然后返回同步的数组 或者是异步的 Promise
   * @param {string} str
   * @return {DataSourceType<T = {}> = T & DataSourceObject} []
   */
  fetchSuggestions: (
    str: string,
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  /**
   * @description 点击选中建议项时触发的回调
   * @param {DataSourceType} item
   */
  onSelect?: (item: DataSourceType) => void;
  /**
   * @description 支持自定义渲染下拉项
   * @param {DataSourceType} item
   * @return ReactElement
   */
  renderOption?: (item: DataSourceType) => ReactElement;
}

/**
 * @description: AutoComplete 联想输入框 可根据输入的值 联想出从静态数据结构或后端服务返回的数据中的值
 * @param {FC<AutoCompleteProps>} props
 * @return {JSX} ReactNode JSX
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props;
  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const [highLightIndex, setHighLightIndex] = useState(-1);
  const debouncedValue = useDebounce(inputValue, 500);

  useClickOutside(componentRef, () => setSuggestions([]));

  /**
   * @description 监听 input 里加了防抖后的值 变化后调用异步函数 fetchSuggestions 进行数据返回 并设置 loading
   * @dependence debouncedValue
   */
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setSuggestions([]);
      const result = fetchSuggestions(debouncedValue);
      if (result instanceof Promise) {
        console.log("It is a promise result");
        setLoading(true);
        result.then((res) => {
          setLoading(false);
          setSuggestions(res);
          if (res.length) setShowDropdown(true);
        });
      } else {
        setSuggestions(result);
        if (result.length) setShowDropdown(true);
      }
    } else {
      setShowDropdown(false);
    }
    setHighLightIndex(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  /**
   * @description: 高亮设置的函数
   * @param {number} index
   */
  const highLight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) index = suggestions.length - 1;
    setHighLightIndex(index);
  };

  /**
   * @description 在 Input 里使用键盘的事件监听
   * @param {KeyboardEvent<HTMLInputElement> | any} e
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement> | any) => {
    // 'keyCode' is deprecated
    switch (e.code) {
      case "Enter": // 13
        suggestions[highLightIndex] &&
          handleSelect(suggestions[highLightIndex]);
        break;
      case "ArrowUp": // 38
        highLight(highLightIndex - 1);
        break;
      case "ArrowDown": // 40
        highLight(highLightIndex + 1);
        break;
      case "Escape": // 27
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };

  /**
   * @description 输入框内容变化监听函数 设置受控组件 Input 的值 设置下部分联想列表
   * @param  {ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };

  /**
   * @description 联想列表的值点击函数 设置受控组件 Input 内的值 设置联想列表为空（隐藏）
   * @param {DataSourceType} item
   */
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setShowDropdown(false);
    onSelect && onSelect(item);
    triggerSearch.current = false;
  };

  /**
   * @description 自定义渲染模板 有 renderOption 就用 renderOption 没有就用 item
   * @param {DataSourceType} item
   * @return renderOption() | item.value;
   */
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  /**
   * @description 添加了动画效果的渲染联想列表
   */
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-left"
        timeout={300}
        onExited={() => {
          setSuggestions([]);
        }}
      >
        <ul className="suggestion-list">
          {loading && (
            <div className="suggestions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const classes = classNames("suggestion-item", {
              "is-active": index === highLightIndex,
            });
            return (
              <li
                key={index}
                className={classes}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };

  return (
    <div className="axtlive-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  );
};

export default AutoComplete;
