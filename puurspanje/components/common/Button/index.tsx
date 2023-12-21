import styles from "./Button.module.scss";
import cn from "classnames";

interface ButtonProps {
  packed?: boolean;
  blue?: boolean;
  orange?: boolean;
  text?: string;
  icon?: any;
  leftIcon?: boolean;
}

export const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  packed = false,
  blue = false,
  orange = false,
  text,
  icon,
  leftIcon = false,
  className,
  children,
  onClick,
  ...rest
}) => (
  <button
    onClick={onClick}
    className={cn(
      styles.button,
      { [styles.packed]: packed, [styles.blue]: blue, [styles.orange]: orange },
      className
    )}
    {...rest}
  >
    {leftIcon && icon}
    {text || children}
    {!leftIcon && icon}
  </button>
);
