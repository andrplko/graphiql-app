import TeamMember from '@/components/TeamMember';
import andrplko from '@/components/TeamMember/constants/andrplko';
import { welcomePageData } from '@/constants';
import styles from '@/styles/Welcome.module.scss';

const Welcome = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>
        GraphiQL{' '}
        <span className={styles.text}>
          is a playground/IDE for graphQL requests
        </span>
      </h4>
      <p className={styles.description}>
        GraphQL is a query language for APIs and a runtime for fulfilling those
        queries with your existing data. GraphQL provides a complete and
        understandable description of the data in your API, gives clients the
        power to ask for exactly what they need and nothing more, makes it
        easier to evolve APIs over time, and enables powerful developer tools.
      </p>
      <h4 className={styles.title}>Features</h4>
      <ul className={styles.list}>
        {welcomePageData.features.map((tech) => (
          <li key={tech} className={styles.item}>
            {tech}
          </li>
        ))}
      </ul>
      <h4 className={styles.title}>Technology stack</h4>
      <ul className={styles.list}>
        {welcomePageData.stack.map((tech) => (
          <li key={tech} className={styles.item}>
            {tech}
          </li>
        ))}
      </ul>
      <h4 className={styles.title}>Team members</h4>
      <TeamMember developer={andrplko} />
    </div>
  );
};

export default Welcome;
