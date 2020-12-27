import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../Icon/icon";

export type ButtonsSize = "lg" | "sm";

export type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
  /**给 Button 添加的类名 */
  className?: string;
  /**是否禁用 Button */
  disabled?: boolean;
  /**给 Button 添加大小 可选 lg | sm */
  size?: ButtonsSize;
  /**Button 的类型 可选  primary | default | danger | link*/
  btnType?: ButtonType;
  /**子节点 */
  children: React.ReactNode;
  /**类型为 link 时的 href 链接 */
  href?: string;
  icon?: IconProp;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;

type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    btnType,
    disabled,
    size,
    children,
    href,
    icon,
    ...restProps
  } = props;
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });
  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  }
  return (
    <div className={classes}>
      {icon && <Icon icon={icon} />}
      <button disabled={disabled} {...restProps}>
        {children}
      </button>
    </div>
  );
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;
