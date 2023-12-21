import styles from "./PropertyItemSkeleton.module.scss";

export const PropertyItemSkeleton = (props) => {
  return (
    <div className={styles.property}>
      <div className={styles.image} />
      <div className={styles.content}>
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};
