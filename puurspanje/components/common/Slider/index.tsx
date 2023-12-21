import styles from "./Slider.module.scss";
import cn from "classnames";
import dynamic from "next/dynamic";
import { CarouselProps } from "react-multi-carousel";

const Carousel = dynamic(() => import("react-multi-carousel"));

const responsive = {
  desktop: {
    breakpoint: { max: 99999, min: 1020 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1020, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};

const Arrow: React.VFC<{ onClick? }> = ({ onClick }) => (
  <button className={styles.button} onClick={onClick}>
    next
  </button>
);

export const Slider: React.FC<
  { wrapperClass?: string } & Partial<CarouselProps>
> = ({ children, wrapperClass, ...props }) => (
  <div className={cn(styles.container, wrapperClass)}>
    <Carousel
      ssr
      infinite
      keyBoardControl={false}
      customLeftArrow={<></>}
      customRightArrow={<Arrow />}
      responsive={responsive}
      itemClass={styles.item}
      {...props}
    >
      {children || []}
    </Carousel>
  </div>
);
