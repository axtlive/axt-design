import React from "react";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

library.add(fas);

export type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}

/**
 * @description: Icon 封装 FontAwesomeIcon 添加 theme
 * @param {FC<IconProps>} props
 * @return {JSX} ReactNode JSX
 */
export const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...restProps } = props;
  const classes = classNames("axtlive-icon", className, {
    [`icon-${theme}`]: theme,
  });
  return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
