import Image from "next/image";
import styles from "./Blog.module.scss";
import cn from "classnames";
import { formatDate, getMediaUrl } from "lib/utils";
import { Button, Slider } from "@components/common";
import Link from "next/link";

export const Blog = (props) => {
  const backgroundImage = props.backgroundImage;
  const title = props.title;
  const author = props.author;
  const content = props.content;
  const publishedAt = props.published_at;
  const relatedPosts = props.relatedPosts;

  const renderText = (item, i) => {
    return (
      <div
        key={i}
        className={cn(styles.content, styles.textContent)}
        dangerouslySetInnerHTML={{ __html: item.text }}
      />
    );
  };

  const renderMedia = (item, i) => {
    return (
      <div
        key={i}
        className={cn(styles.content, styles.mediaContent)}
        data-items={item.media.length}
      >
        {item.media.map((media) => (
          <>
            <Image
              key={media.url}
              src={media.url}
              width={media.width}
              height={media.height}
            />
          </>
        ))}
      </div>
    );
  };

  const renderBanner = (item, i) => {
    return (
      <div key={i} className={cn(styles.content, styles.bannerContent)}>
        <h3>{item.title}</h3>
        <div>
          <p>{item.body}</p>
          <Button>Bekijk aanbod</Button>
        </div>
      </div>
    );
  };

  const renderContent = (item, i) => {
    switch (item.__typename) {
      case "ComponentBlogContentText":
        return renderText(item, i);
      case "ComponentBlogContentMedia":
        return renderMedia(item, i);
      case "ComponentBlogBanner":
        return renderBanner(item, i);
    }
  };

  return (
    <section>
      <div className={styles.imageWrapper}>
        <Image
          src={backgroundImage.url}
          layout="fill"
          objectFit="cover"
          objectPosition="center 60%"
        />
      </div>
      <article className={styles.container}>
        <div className={cn(styles.content, styles.head)}>
          <h2 className={styles.title}>{title}</h2>
          <span>{formatDate(publishedAt)}</span>
        </div>
        {content && content.map((item, i) => renderContent(item, i))}
        <div className={cn(styles.content, styles.author)}>
          <span>
            Bron:{" "}
            <Link href="/">
              <a>{author}</a>
            </Link>
          </span>
        </div>
      </article>
      <div className={cn(styles.container, styles.relatedArticles)}>
        <hr />
        <h2>Gerelateerde artikelen</h2>
        <Slider wrapperClass={styles.relatedArticlesSlider}>
          {relatedPosts.map((post) => (
            <Link
              key={post.title}
              href={{
                pathname: "/blog/[slug]",
                query: { slug: post.slug },
              }}
            >
              <a className={styles.postCard} tabIndex={-1}>
                <Image
                  src={getMediaUrl(post.backgroundImage.url)}
                  width={400}
                  height={200}
                />
                <div className={styles.postCardBody}>
                  <div>
                    <h3>{post.title}</h3>
                    <p>{post.summary}</p>
                  </div>
                  <img
                    src="/assets/arrow-black.svg"
                    alt="arrow right"
                    width={16}
                    height={11}
                  />
                </div>
              </a>
            </Link>
          ))}
          <div className={styles.searchCTA}>
            <div>
              <h3>Kopen in Spanje?</h3>
              <p>
                Benieuwd naar wat je kunt kopen in de beste regio van Spanje?
              </p>
              <p>
                Maak een zoekprofiel aan en ontvang kosteloos en vrijblijvend
                een persoonlijke top 5.
              </p>
            </div>
            <Button>Zoekprofiel</Button>
          </div>
        </Slider>
      </div>
    </section>
  );
};
