import { render, screen } from '@testing-library/react';
import TeamMember from '@/components/TeamMember';
import photo from '/public/andrplko.jpg';
import { Role } from '@/components/TeamMember/types';

const mockDeveloperData = {
  name: 'John Doe',
  image: photo,
  github: 'johndoe',
  role: Role.developer,
  contribution: ['Contribution 1', 'Contribution 2'],
};

const mockLocaleContext = {
  localeData: {
    welcome_page: {
      team_members: {
        card: {
          name: 'John Doe',
          role: 'Developer',
          contribution: {
            title: 'Contribution Title',
            list: ['Contribution 1', 'Contribution 2'],
          },
        },
      },
    },
  },
};

jest.mock('../context/locales', () => ({
  ...jest.requireActual('../context/locales'),
  useLocaleContext: jest.fn(() => mockLocaleContext),
}));

describe('TeamMember component', () => {
  test('renders TeamMember component with developer data', () => {
    render(<TeamMember developer={mockDeveloperData} />);

    expect(screen.getByAltText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('johndoe')).toBeInTheDocument();

    expect(screen.getByAltText('github icon')).toBeInTheDocument();

    expect(screen.getByText('Contribution Title')).toBeInTheDocument();
    expect(screen.getByText('Contribution 1')).toBeInTheDocument();
    expect(screen.getByText('Contribution 2')).toBeInTheDocument();
  });
});
