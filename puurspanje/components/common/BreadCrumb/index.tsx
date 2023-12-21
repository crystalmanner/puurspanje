import styles from "./BreadCrumb.module.scss";
import cn from "classnames";
import IconRight from "@public/assets/chevron-right.svg";

export const BreadCrumb: React.FC<{
  separator?: React.ReactNode;
  wrapperClass?: string;
}> = ({ children, separator, wrapperClass }) => {
  separator = (
    <span className={styles.separator}>
      {separator ?? <IconRight className={styles.icon} />}
    </span>
  );

  const [first, ...rest] = Array.isArray(children) ? children : [children];

  return (
    <ul className={cn(styles.breadCrumb, wrapperClass)}>
      <li className={styles.item}>{first}</li>
      {rest.map((item, i) => (
        <li key={i} className={styles.item}>
          {separator}
          {item}
        </li>
      ))}
    </ul>
  );
};
