import { render, screen } from '@testing-library/react';
import Editor from '@/components/Editor';
import LocaleProvider from '@/context/locales';

describe('Editor component', () => {
  const onClickExecuteButton = jest.fn();

  test('renders Editor component', () => {
    render(
      <LocaleProvider>
        <Editor onClickExecuteButton={onClickExecuteButton} />
      </LocaleProvider>
    );

    expect(screen.getByAltText('execute icon')).toBeInTheDocument();
    expect(screen.getByAltText('prettify icon')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
