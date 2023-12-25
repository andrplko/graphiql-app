const prettifyQuery = (value: string) => {
  let indentation = 0;
  const indentSize = 2;

  const trimmedArray = value
    .replace(/\s/g, '')
    .split(/(\([^)]+\)|{|})|\s+/)
    .filter(Boolean);

  return trimmedArray
    .map((item, index, array) => {
      if (item.includes('query')) {
        return item.replace('query', '$& ');
      }

      if (/[()]/g.test(item)) {
        return item.replace(/[:,]/g, '$& ');
      }

      if (item.includes('{')) {
        indentation += indentSize;
        const indent = ' '.repeat(indentation);
        item += `\n${indent}`;
        item = ' '.repeat(indentSize / indentSize) + item;

        return item;
      }

      if (item.includes('}')) {
        indentation -= indentSize;
        const indent = ' '.repeat(indentation);
        item = `\n${indent}` + item;

        if (/[A-Za-z]/g.test(array[index + 1])) {
          item += `\n${indent}`;
          return item;
        }

        return item;
      }

      return item;
    })
    .join('')
    .trim();
};

export default prettifyQuery;
