import styles from "./Tag.module.scss";
import cn from "classnames";

export const Tag: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (props) => (
  <span
    {...props}
    className={cn(styles.tag, { [props.className as string]: props.className })}
  />
);
