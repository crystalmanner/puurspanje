import styles from "./TestimonialsSection.module.scss";
import Image from "next/image";
import { realEstate, reviewSlider, team } from "../constants";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useEffect, useState } from "react";
import Link from "next/link";
import cn from "classnames";

const NEXT_REVIEW_TIMEOUT = 5000;

export const TestimonialsSection = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [currentReview, setCurrentReview] = useState(
    reviewSlider[currentReviewIndex]
  );
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentReviewIndex((i) => (i + 1) % reviewSlider.length);
    }, NEXT_REVIEW_TIMEOUT);
    return () => clearTimeout(timeout);
  }, [currentReviewIndex, reviewSlider]);
  useEffect(() => {
    setCurrentReview(reviewSlider[currentReviewIndex]);
  }, [currentReviewIndex, reviewSlider]);

  return (
    <section className="container">
      <div className={styles.reviews}>
        <div className={styles.imageGroupWrapper}>
          <div className={styles.imageGroup}>
            {reviewSlider.map((review, i) => (
              <div
                key={i}
                className={styles.reviewImage}
                onClick={() => setCurrentReviewIndex(i)}
              >
                <Image
                  src={review.imgUrl}
                  alt={review.imgAlt}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>
        <TransitionGroup className={styles.reviewContentWrapper}>
          <CSSTransition key={currentReviewIndex} timeout={600}>
            <>
              <div className={styles.reviewContent}>
                <div
                  dangerouslySetInnerHTML={{ __html: currentReview.content }}
                />
                <Link href="/">
                  <a>All reviews</a>
                </Link>
              </div>
            </>
          </CSSTransition>
        </TransitionGroup>
      </div>
      <div className={styles.post}>
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: realEstate.content }} />
          <Link href={realEstate.href}>
            <a>{realEstate.link}</a>
          </Link>
        </div>
        <div className={styles.image}>
          <Image
            src={realEstate.imgUrl}
            alt={realEstate.imgAlt}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className={cn(styles.post, styles.reverse)}>
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: team.content }} />
          <Link href={team.href}>
            <a>{team.link}</a>
          </Link>
        </div>
        <div className={styles.image}>
          <Image
            src={team.imgUrl}
            alt={team.imgAlt}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </section>
  );
};
