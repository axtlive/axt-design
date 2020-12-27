import React, { useContext, MouseEvent } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * @description: Menu 或 Submenu 的子元素
 * @param {FC<MenuItemProps>} props
 * @return {JSX} ReactNode
 */
const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });
  /**
   * @description 元素被点击的时候触发事件
   * @param {MouseEvent} e
   */
  const handleClick = (e: MouseEvent) => {
    if (context.onSelect && !disabled && typeof index === "string") {
      e.stopPropagation();
      context.onSelect(index);
    }
  };
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = "MenuItem";
export default MenuItem;
