import React, {
  useState,
  useContext,
  MouseEvent,
  FunctionComponentElement,
} from "react";
import Transition from "../Transition/transition";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";

export interface SubMenuProps {
  index?: string;
  title?: string;
  className?: string;
}

/**
 * @description: Submenu 显影具有动画的二级菜单
 * @param {FC<SubMenuProps>} props
 * @return {JSX} ReactNode
 */
const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<String>;
  const isOpened =
    index && context.mode === "vertical"
      ? openedSubMenus.includes(index)
      : false;
  const [menuOpen, setOpen] = useState(isOpened);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical",
  });

  /**
   * @description 鼠标点击事件
   */
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };

  /**
   * @description 鼠标移入移出事件处理函数
   */
  let timer: any;
  const handleMouse = (e: MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };

  /**
   * @description 鼠标点击事件 模式为竖直时存在
   */
  const clickEvents =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};

  /**
   * @description 鼠标移入移出绑定的事件
   */
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};

  /**
   * @description 渲染子元素
   */
  const renderChildren = () => {
    const subMenuClasses = classNames("axtlive-submenu", {
      "menu-opened": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error(
          "Warning: Menu has a child which is not a MenuItem component",
        );
      }
    });
    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    );
  };
  return (
    <li key={index} className={classes} {...hoverEvents} {...clickEvents}>
      <div className="submenu-title" onClick={handleClick}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;
