import styles from "./Header.module.scss";
import cn from "classnames";
import Link from "next/link";
import { Tag, Button } from "@components/common";
import Logo from "@public/logo/logo.svg";

export const Header: React.VFC<{ wrapperClass?: string }> = ({
  wrapperClass,
}) => (
  <header className={cn(styles.headerWrapper, wrapperClass)}>
    <div className={cn("container", styles.header)}>
      <nav>
        <Link href="/">
          <a className={styles.logoWrapper}>
            <Logo />
          </a>
        </Link>
        <ul>
          <li>
            <Link href="/">
              <a>Aanbod</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Regio</a>
            </Link>
            <Tag className={styles.tag}>nieuw</Tag>
          </li>
          <li>
            <Link href="/">
              <a>Verhuurgarantie</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Aanpak</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                Meer
                <img src="/assets/more.svg" alt="more" width="6" height="6" />
              </a>
            </Link>
          </li>
        </ul>
        <Button packed>Zoekprofiel</Button>
      </nav>
    </div>
  </header>
);
