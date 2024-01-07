import { AxiosHeaders } from 'axios';

const parseRequestData = (headers: string, variables: string) => {
  const parsedHeaders: AxiosHeaders | null = headers
    ? JSON.parse(headers)
    : null;

  const parsedVariables: Record<string, unknown> | null = variables
    ? JSON.parse(variables)
    : null;

  return { parsedHeaders, parsedVariables };
};

export default parseRequestData;
