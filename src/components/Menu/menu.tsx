import React, { useState, createContext } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  /**默认选中的索引 */
  defaultIndex?: string;
  /**属性名 */
  className?: string;
  /**模式 横向 | 竖向 */
  mode?: MenuMode;
  /**样式 */
  style?: React.CSSProperties;
  /**选中触发事件 */
  onSelect?: SelectCallback;
  /**默认展开的二级菜单 */
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });

/**
 * @description: Menu 菜单 横向 | 竖向
 * @param {FC<MenuProps>} props
 * @return {JSX} ReactNode
 */
const Menu: React.FC<MenuProps> = (props) => {
  const {
    className,
    mode,
    style,
    children,
    defaultIndex,
    onSelect,
    defaultOpenSubMenus,
  } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames("axtlive-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });

  /**
   * @description 子元素被点击的时候触发的事件
   * @param {string} index
   */
  const handleClick = (index: string) => {
    setActive(index);
    onSelect && onSelect(index);
  };

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    defaultOpenSubMenus,
    mode,
  };

  /**
   * @description 渲染子元素
   */
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error(
          "Warning: Menu has a child which is not a MenuItem component",
        );
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

/**默认props属性 */
Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenus: [],
};

export default Menu;
