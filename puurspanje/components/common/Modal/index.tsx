import { usePortal } from "lib/usePortal";
import styles from "./Modal.module.scss";
import cn from "classnames";
import Image from "next/image";
export const Modal = (props) => {
  const { children, show, onCloseClick, wrapperClass } = props;
  const Portal = usePortal();
  return (
    <Portal>
      {show && (
        <div className={cn(styles.modal, wrapperClass)}>
          <button onClick={onCloseClick} className={styles.close}><img src="/assets/close-icon.svg" alt="close dialog" /></button>
          <div className={styles.inner}>
          {children.map((image, index) => (
                <div className={index%3 === 0 ? styles.fullWidth: styles.halfWidth}>
                  <Image
                    key={image.url}
                    src={image.url || "404"}
                    width={image.width}
                    height={index%3 === 0 ? 500 : image.height}
                    layout="responsive"
                    priority
                    loading="eager"
                  />
                  </div>
                ))}
          </div>
        </div>
      )}
    </Portal>
  );
};
