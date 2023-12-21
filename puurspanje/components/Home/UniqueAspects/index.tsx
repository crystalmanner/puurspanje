import styles from './UniqueAspects.module.scss';
import Check from '@public/assets/circle-check-alt.svg';
import Link from 'next/link';

const aspectList = [
  "Gemeenschappelijke tuin",
  "Gemeenschappelijk zwembad",
  "Wandelafstand strand",
  "Haven op wandelafstand",
];

export const UniqueAspects = () => {
  return (
    <section className="container">
      <ul className={styles.aspects}>
        {aspectList.map(name => (
          <li key={name}>
            <Check />
            <Link href="/">
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}