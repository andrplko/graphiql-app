import parseRequestData from '@/utils/parseRequestData';

describe('parseRequestData', () => {
  it('should parse headers and variables correctly', () => {
    const headers =
      '{"Content-Type": "application/json", "Authorization": "Bearer token"}';
    const variables = '{"param1": "value1", "param2": 42}';

    const result = parseRequestData(headers, variables);

    expect(result.parsedHeaders).toEqual({
      'Content-Type': 'application/json',
      Authorization: 'Bearer token',
    });

    expect(result.parsedVariables).toEqual({
      param1: 'value1',
      param2: 42,
    });
  });

  it('should return null for empty or invalid headers/variables', () => {
    const result = parseRequestData('', '');

    expect(result.parsedHeaders).toBeNull();
    expect(result.parsedVariables).toBeNull();
  });
});
