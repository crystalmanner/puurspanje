import styles from "./Footer.module.scss";
import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@components/common";
import { links } from "./constants";
import { useEffect, useState } from "react";
import { useBreakpoint } from "lib/useBreakpoint";

const socialIcons = (
  <ul className={styles.socialIcons}>
    <li>
      <a href="https://google.com">
        <img
          src="/social/facebook-gray.svg"
          width="16"
          height="16"
          alt="icon facebook"
        />
      </a>
    </li>
    <li>
      <a href="https://google.com">
        <img
          src="/social/twitter-gray.svg"
          width="16"
          height="16"
          alt="icon twitter"
        />
      </a>
    </li>
    <li>
      <a href="https://google.com">
        <img
          src="/social/instagram-gray.svg"
          width="16"
          height="16"
          alt="icon instagram"
        />
      </a>
    </li>
  </ul>
);

export const Footer = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const bp = useBreakpoint();

  useEffect(() => {
    if (!bp.sm) {
      setActiveItem(null);
    }
  }, [bp.sm]);

  return (
    <footer>
      <div className={cn("container", styles.top)}>
        <div className={styles.contact}>
          <h3>Contact</h3>
          <div className={styles.contactBottom}>
            <div className={styles.avatar}>
              <Image
                src="/images/avatar.jpg"
                alt="avatar"
                width={200}
                height={200}
                objectFit="cover"
              />
            </div>
            <div className={styles.contactInfo}>
              <Link href="mailto:info@puurspanje.nl">
                <a>info@puurspanje.nl</a>
              </Link>
              <Link href="tel:+34618245967">
                <a>+34 618 245 967</a>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.subscribe}>
          <div>
            <h3>Nieuwsbrief?</h3>
            <p>
              97% van onze abonnees beoordeelt onze nieuwsbrief als nuttig en
              positief.
            </p>
          </div>
          <form>
            <input type="text" placeholder="Emailadres" />
            <Button orange>Inschrijven</Button>
          </form>
        </div>
      </div>
      <div className="container">
        <div className={styles.companies}>
          <Image
            src="/assets/company/Bekend_van.svg"
            alt="avatar"
            width={99}
            height={24}
          />
          <Image
            src="/assets/company/fd-1.svg"
            alt="avatar"
            width={93}
            height={36}
          />
          <Image
            src="/assets/company/rtl4-1.svg"
            alt="avatar"
            width={93}
            height={36}
          />
          <Image
            src="/assets/company/rtlz.svg"
            alt="avatar"
            width={93}
            height={36}
          />
          <Image
            src="/assets/company/second.svg"
            alt="avatar"
            width={93}
            height={36}
          />
          <Image
            src="/assets/company/the_art_of_living.svg"
            alt="avatar"
            width={93}
            height={36}
          />
          <Image
            src="/assets/company/elsevier.svg"
            alt="avatar"
            width={93}
            height={36}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <div className="container">
          <div className={styles.footerTop}>
            <Link href="/">
              <a>
                <img
                  src="/logo/logo-white.svg"
                  width="116"
                  height="21"
                  alt="logo"
                />
              </a>
            </Link>
            {socialIcons}
          </div>
          <hr />
          <nav className={styles.nav}>
            {links.map((list) => (
              <div
                key={list.title}
                className={cn(styles.listItem, {
                  [styles.active]: bp.sm || activeItem === list.title,
                })}
                onClick={() =>
                  setActiveItem((item) =>
                    list.title === item ? null : list.title
                  )
                }
              >
                <h3>
                  {list.title}
                  <img src="/assets/triangle-chevron-down.svg" alt="" />
                </h3>
                <ul>
                  {list.list.map((listItem) => (
                    <li key={listItem.name}>
                      <Link href={listItem.href}>
                        <a>{listItem.name}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <div className={styles.bottomSocialIcons}>{socialIcons}</div>
          <hr />
          <div className={styles.bottom}>
            <Link href="/">
              <a>Juridische mededeling</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
