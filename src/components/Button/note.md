# Button 组件开发过程中遇到的不了解的、需要注意的知识点


```ts  

// 对 对象 处理生成 className 的库
import classNames from "classnames";

// intersection Types 交叉类型
// A & B

// 原生按钮属性
type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>;


// 超链接属性
type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>;

// 设置所有属性都是可选的 Partial<T>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

// 其余的用户传参 使用展开运算符
 const {
    className,
    btnType,
    disabled,
    size,
    children,
    href,
    ...restProps
  } = props;
```



