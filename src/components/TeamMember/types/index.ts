import { StaticImageData } from 'next/image';

export enum Role {
  developer = 'Developer',
  lead = 'Team Lead',
}

export type DevelopersData = {
  name: string;
  image: StaticImageData;
  role: Role;
  github: string;
  contribution: string[];
};
