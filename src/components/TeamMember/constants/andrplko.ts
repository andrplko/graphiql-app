import photo from 'public/andrplko.jpg';
import { Role, DevelopersData } from '../types';

const andrplko: DevelopersData = {
  name: 'Andrei Paleshka',
  image: photo,
  role: Role.lead,
  github: 'andrplko',
  contribution: [
    'Project setup',
    'GraphQL API requests',
    'Welcome Page',
    'Main Page',
    'SignIn/SignUp pages',
    'Authentication',
    'Localization',
    'App Styling',
  ],
};

export default andrplko;
