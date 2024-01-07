import { render, screen } from '@testing-library/react';
import Editor from '@/components/Editor';

const mockLocaleContext = {
  localeData: {
    main_page: {
      editor: {
        placeholder: 'Type query',
      },
    },
  },
};

const onClickExecuteButton = jest.fn();

jest.mock('../context/locales', () => ({
  ...jest.requireActual('../context/locales'),
  useLocaleContext: jest.fn(() => mockLocaleContext),
}));

describe('Editor component', () => {
  test('renders Editor component', () => {
    render(<Editor onClickExecuteButton={onClickExecuteButton} />);

    expect(screen.getByAltText('execute icon')).toBeInTheDocument();
    expect(screen.getByAltText('prettify icon')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
