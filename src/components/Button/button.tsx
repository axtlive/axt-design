import React from "react";
import classNames from "classnames";

export enum ButtonsSize {
    Large = "lg",
    Small = "sm",
}

export enum ButtonType {
    Primary = "primary",
    Default = "default",
    Danger = "danger",
    Link = "link",
}

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonsSize;
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}

type NativeButtonProps = BaseButtonProps &
    React.ButtonHTMLAttributes<HTMLElement>;

type AnchorButtonProps = BaseButtonProps &
    React.AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = props => {
    const {
        className,
        btnType,
        disabled,
        size,
        children,
        href,
        ...restProps
    } = props;
    const classes = classNames("btn", className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        disabled: btnType === ButtonType.Link && disabled,
    });
    if (btnType === ButtonType.Link && href) {
        return (
            <a className={classes} href={href} {...restProps}>
                {children}
            </a>
        );
    }
    return (
        <button className={classes} disabled={disabled} {...restProps}>
            {children}
        </button>
    );
};

Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default,
};

export default Button;
