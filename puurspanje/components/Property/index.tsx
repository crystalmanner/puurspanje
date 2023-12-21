import React, { useEffect, useRef, useState } from "react";
import styles from "./Property.module.scss";
import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import GoogleMapReact from "google-map-react";

import { NextSeo } from "next-seo";
import { BreadCrumb, Button, Carousel, Slider } from "@components/common";

import { formatPrice } from "lib/utils";
import { getInfoList, getMediaByCategory } from "./utils";
import { Modal } from "@components/common/Modal";

const Marker: React.VFC<any> = () => <div className={styles.marker} />;

export const Property: React.VFC<any> = (props) => {
  const {
    id,
    name,
    town: { name: town, content: townContent },
    location: { name: location },
    province: { name: province },
    aspects,
    description,
    seo,
    slides,
    latitude,
    longitude,
  } = props;

  const mapRef = useRef<HTMLElement>(null);

  const infoList = getInfoList(props);
  const price = formatPrice(props.price);

  const [banner, setBanner] = useState(getMediaByCategory(props.media, "banner")?.[0] || null);
  const [media, setMedia] = useState(getMediaByCategory(props.media, "media") || null);
  const [overviewImageUrl, setImageUrl] = useState(props.town.imgUrl);
  const [townsImg, setTownImage] = useState(getMediaByCategory(props.media, "town") || null);
  const [modalVisibility, setModalStatus] = useState(false);
  
  const mediaImgClick = (image) => {
    if (!media) return;
    let medias = media.filter(function( obj) {
      return obj.url !== image.url;
    });
    medias.push(banner);
    setMedia(medias || null);
    setBanner(image || null);
  }

  const townImgClick = (imageUrl) => {
    if (!townsImg) return;
    let townsTemp = townsImg.filter(function( obj) {
      return obj.url !== imageUrl;
    });
    townsTemp.push({ url: overviewImageUrl });
    setTownImage(townsTemp || null);
    setImageUrl(imageUrl || null);
  }

  const showModal = (val) => {
    console.log(val, "val");
    setModalStatus(val);
  }

  const onCloseClick = () => {
    setModalStatus(false);
  }
  return (
    <>
      <NextSeo
        titleTemplate="%s - Puurspanje"
        title={seo?.title && seo.title}
      />
      <section className={styles.container}>
        <BreadCrumb>
          <Link href="/apartment">
            <a>Aanbod</a>
          </Link>
          <Link href="/apartment">
            <a>{province}</a>
          </Link>
          <Link href="/apartment">
            <a>{town}</a>
          </Link>
        </BreadCrumb>
        <div className={styles.section}>
          <Modal show={modalVisibility} children={media} onCloseClick={onCloseClick} />
          <div className={ cn(styles.details, styles.orderId1) }>
            <div className={styles.heroImgDiv}>
              {banner && (
                <Image
                  className={styles.heroImg}
                  src={banner.url || "404"}
                  width={560}
                  height={420}
                  layout="responsive"
                  priority
                  loading="eager"
                />
              )}
            </div>
            {media && (
              <div className={styles.media}>
                {media.slice(0, 4).map((image) => (
                  <Image
                    className={styles.mediaImg}
                    key={image.url}
                    src={image.url || "404"}
                    width={100}
                    height={80}
                    onClick={() => mediaImgClick(image)}
                    priority
                    loading="eager"
                  />
                ))}
                <Button onClick={() => showModal(true)}>
                  Alle media
                </Button>
              </div>
            )}
            <div className={ styles.description }>
              <h2>Omschrijving</h2>
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            <hr/>
            <div className={styles.moreInfo}>
              <div>
                <h2>Meer informatie</h2>
                <p>
                  Wil je meer weten over deze woning of heb je vragen over de
                  regio?{" "}
                </p>
                <p>
                  Voer onderstaande velden in en wij sturen je vrijblijvend meer
                  informatie toe.
                </p>
                <form>
                  <input type="text" placeholder="Voornaam" />
                  <input type="text" placeholder="Achternaam" />
                  <input type="text" placeholder="Telefoon" />
                  <input type="text" placeholder="Email" />
                  <Button orange>Verzend</Button>
                </form>
              </div>
            </div>
          </div>
          <div className={ cn(styles.details, styles.orderId2) }>
            <div className={styles.heroImgDiv}>
              {banner && (
                <Image
                  className={styles.heroImg}
                  src={banner.url || "404"}
                  width={banner.width}
                  height={banner.height}
                  layout="responsive"
                  priority
                  loading="eager"
                />
              )}
            </div>
            <h1>{name}</h1>
            <div className={styles.location}>
              <div className={styles.text}>
                <img src="/assets/pin-orange.svg" alt="location icon" />
                <p>{location}</p>
              </div>
            </div>
            <span className={styles.price}>€&nbsp;{price}</span>
            <div className={styles.info}>
              {infoList.map((infoItem) => (
                <div key={infoItem.id}>
                  <img src={infoItem.iconSrc} alt="info icon" />
                  <span>{infoItem.value}</span>
                  <span>{infoItem.name}</span>
                </div>
              ))}
            </div>
            <div className={styles.property}>
              <p>Property ID: {id}</p>
            </div>
            <div className={styles.navigation}>
              <Button orange>
                Submit a request
              </Button>
              <Button>
                Brochure
                <img src="/assets/arrow-down-orange.svg" alt="location icon" />
              </Button>
              <Button>
                Virtuele tour
                <img src="/assets/rotation_rounded.svg" alt="location icon" />
              </Button>
            </div>

            <h2>Unieke aspecten</h2>
            <div className={styles.aspectList}>
              {aspects
                ? aspects.map((aspectItem) => (
                    <div key={aspectItem.id}>
                      <img src="/assets/check-orange.svg" alt="aspects check" />
                      <p>{aspectItem.name}</p>
                    </div>
                  ))
                : "no aspects"}
            </div>
            <Button className={styles.btnMeer}>
                Meer informatie
            </Button>
          </div>
        </div>
      </section>
      <section className={styles.container}>
        <div className={styles.overview}>
          <div className={styles.overviewImageWrapper}>
            {overviewImageUrl && (
              <Image
                src={overviewImageUrl || "404"}
                width={560}
                height={340}
                layout="responsive"
                priority
                loading="eager"
              />
            )}
            {townsImg && (
              <div className={styles.town}>
                {townsImg.slice(0, 3).map((image) => (
                  <Image
                    className={styles.townImg}
                    key={image.url}
                    src={image.url || "404"}
                    width={127}
                    height={100}
                    layout="responsive"
                    onClick={() => townImgClick(image.url)}
                    priority
                    loading="eager"
                  />
                ))}
              </div>
            )}
          </div>
          <div
            className={cn(styles.description, styles.overviewDescription)}
          >
            <div
              dangerouslySetInnerHTML={{ __html: townContent }}
            />
            <div className={styles.readMore}><p>Lees meer <img src="/assets/arrow-orange.svg" alt="icon arrow" /></p></div>
          </div>
        </div>
      </section>
      <section className={styles.container}>
        <div className={styles.map}>
          {latitude && longitude && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
              }}
              center={{
                lat: latitude,
                lng: longitude,
              }}
              zoom={12}
              yesIWantToUseGoogleMapApiInternals
              // @ts-ignore ref is not readonly
              onGoogleApiLoaded={({ ref }) => (mapRef.current = ref)}
            >
              <Marker lat={latitude} lng={longitude} text="My Marker" />
            </GoogleMapReact>
          )}
        </div>
      </section>
      <div className={styles.slideView}>
        <Carousel slides={slides} />
      </div>
    </>
  );
};
