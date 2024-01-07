import { render, screen, fireEvent } from '@testing-library/react';
import EndpointChanger from '@/components/EndpointChanger';
import LocaleProvider from '@/context/locales';

describe('EndpointChanger component', () => {
  const onSubmitEndpointMock = jest.fn();

  test('renders EndpointChanger component', () => {
    render(
      <LocaleProvider>
        <EndpointChanger onSubmitEndpoint={onSubmitEndpointMock} />
      </LocaleProvider>
    );

    const inputElement = screen.getByPlaceholderText('Type endpoint');
    const buttonElement = screen.getByRole('button');

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('submits the form with a valid endpoint', () => {
    render(
      <LocaleProvider>
        <EndpointChanger onSubmitEndpoint={onSubmitEndpointMock} />
      </LocaleProvider>
    );

    const inputElement = screen.getByPlaceholderText('Type endpoint');
    const buttonElement = screen.getByRole('button');

    fireEvent.change(inputElement, {
      target: { value: 'https://rickandmortyapi.com/graphql' },
    });
    fireEvent.click(buttonElement);

    expect(onSubmitEndpointMock).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/graphql'
    );
  });

  test('does not submit the form with an empty endpoint', () => {
    render(
      <LocaleProvider>
        <EndpointChanger onSubmitEndpoint={onSubmitEndpointMock} />
      </LocaleProvider>
    );

    const inputElement = screen.getByPlaceholderText('Type endpoint');
    const buttonElement = screen.getByRole('button');

    fireEvent.change(inputElement, {
      target: { value: '' },
    });

    fireEvent.click(buttonElement);

    expect(onSubmitEndpointMock).not.toHaveBeenCalled();
  });
});
