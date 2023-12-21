import styles from "./Home.module.scss";
import { Hero } from "./Hero";
import { UniqueAspects } from "./UniqueAspects";
import { RegionsSection } from "./RegionsSection";
import { TrustSection } from "./TrustSection";
import { SellingPoints } from "./SellingPoints";
import { TestimonialsSection } from "./TestimonialsSection";
import { Carousel } from "@components/common/Carousel";

export const Home = ({ slides }) => (
  <main>
    <Hero />
    <UniqueAspects />
    <RegionsSection />
    <Carousel wrapperClass={styles.carousel} slides={slides} />
    <TrustSection />
    <SellingPoints />
    <TestimonialsSection />
  </main>
);
