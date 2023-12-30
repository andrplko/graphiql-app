import TeamMember from '@/components/TeamMember';
import andrplko from '@/components/TeamMember/constants/andrplko';
import { useLocaleContext } from '@/context/locales';
import styles from '@/styles/Welcome.module.scss';

const Welcome = () => {
  const {
    localeData: { welcome_page },
  } = useLocaleContext();

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>
        {welcome_page.title.keyword}{' '}
        <span className={styles.text}>{welcome_page.title.text}</span>
      </h4>
      <p className={styles.description}>{welcome_page.description}</p>
      <h4 className={styles.title}>{welcome_page.features.title}</h4>
      <ul className={styles.list}>
        {welcome_page.features.list.map((tech) => (
          <li key={tech} className={styles.item}>
            {tech}
          </li>
        ))}
      </ul>
      <h4 className={styles.title}>{welcome_page.tech_stack.title}</h4>
      <ul className={styles.list}>
        {welcome_page.tech_stack.list.map((tech) => (
          <li key={tech} className={styles.item}>
            {tech}
          </li>
        ))}
      </ul>
      <h4 className={styles.title}>{welcome_page.team_members.title}</h4>
      <TeamMember developer={andrplko} />
    </div>
  );
};

export default Welcome;
