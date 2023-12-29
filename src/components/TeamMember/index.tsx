import Image from 'next/image';
import { DevelopersData } from './types';
import GithubIcon from 'public/github-mark.svg';
import styles from './TeamMember.module.scss';

interface TeamMemberProps {
  developer: DevelopersData;
}

const TeamMember = ({ developer }: TeamMemberProps) => {
  const { name, role, image, github, contribution } = developer;

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Image src={image} alt={name} className={styles.photo} />
        <div className={styles.details}>
          <h3 className={styles.name}>{name}</h3>
          <h4 className={styles.role}>{role}</h4>
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
              title={`${name} GitHub`}
            >
              {github}
            </a>
          </div>
          <div className={styles.contribution}>
            <h4 className={styles.contribution_title}>Contribution</h4>
            <ul className={styles.contribution_list}>
              {contribution.map((item) => (
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
