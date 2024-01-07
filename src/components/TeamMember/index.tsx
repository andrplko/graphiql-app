import Image from 'next/image';
import { DevelopersData } from './types';
import GithubIcon from 'public/github-mark.svg';
import { useLocaleContext } from '@/context/locales';
import styles from './TeamMember.module.scss';

interface TeamMemberProps {
  developer: DevelopersData;
}

const TeamMember = ({ developer }: TeamMemberProps) => {
  const { name, image, github } = developer;
  const {
    localeData: { welcome_page },
  } = useLocaleContext();

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Image src={image} alt={name} className={styles.photo} />
        <div className={styles.details}>
          <h3 className={styles.name}>{welcome_page.team_members.card.name}</h3>
          <h4 className={styles.role}>{welcome_page.team_members.card.role}</h4>
          <div className={styles.github}>
            <Image
              src={GithubIcon}
              width={16}
              height={16}
              alt="github icon"
              className={styles.image}
            />
            <a
              href={`https://github.com/${github}`}
              className={styles.link}
              rel="noreferrer"
              target="_blank"
              title={`${welcome_page.team_members.card.name} GitHub`}
            >
              {github}
            </a>
          </div>
          <div className={styles.contribution}>
            <h4 className={styles.contribution_title}>
              {welcome_page.team_members.card.contribution.title}
            </h4>
            <ul className={styles.contribution_list}>
              {welcome_page.team_members.card.contribution.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
