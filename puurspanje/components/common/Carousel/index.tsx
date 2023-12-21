import styles from "./Carousel.module.scss";
import cn from "classnames";
import Link from "next/link";
import { Card, SkeletonCard, Slider } from "@components/common";
import { formatPrice } from "lib/utils";
import Image from "next/image";
import Arrow from '@public/assets/arrow-black.svg';

export const Carousel: React.VFC<{
  wrapperClass?: string;
  slides?: any[] | null;
}> = ({ wrapperClass, slides }) => {
  return (
    <section className={cn(styles.carousel, wrapperClass)}>
      <div className={styles.container}>
        <h2>Uitgelichte woningen</h2>
        {slides && slides.length === 0 ? (
          // Handle empty
          "Nothing to show"
        ) : (
          <Slider>
            {slides
              ? slides.map((card, i) => (
                  <div key={i} className={styles.card}>
                    <Image src={card.imgUrl} alt={card.imgAlt} width="360" height="200" objectFit="cover" />
                    <div className={styles.cardBody}>
                      <Link
                        href={{
                          pathname: "/property/[slug]",
                          query: { slug: card.slug },
                        }}
                      >
                        <a tabIndex={-1}>
                          {card.title}
                          <Arrow />
                        </a>
                      </Link>
                      <span>€ {formatPrice(card.price)}</span>
                    </div>
                  </div>
                ))
              : [1, 2, 3, 4].map((key) => <SkeletonCard key={key} />)}
          </Slider>
        )}
      </div>
    </section>
  );
};
