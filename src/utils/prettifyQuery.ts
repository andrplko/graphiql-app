const prettifyQuery = (value: string) => {
  let indentation = 0;
  const indentSize = 2;

  const trimmedArray = value.split(/(\([^)]+\)|{|})|\s+/).filter(Boolean);

  return trimmedArray
    .map((item, index, array) => {
      if (item.includes('query') && /^[A-Za-z]+$/.test(array[index + 1])) {
        return item.replace('query', '$& ');
      }

      if (/[()]/g.test(item)) {
        return item
          .replace(/\s/g, '')
          .replace(/[:,]/g, '$& ')
          .replace(/=/g, ' $& ');
      }

      if (/:/g.test(item)) {
        return item.replace(/:/g, '$& ');
      }

      if (/^[A-Za-z]+$/.test(item) && /^[A-Za-z|.]+$/.test(array[index + 1])) {
        item += `\n${' '.repeat(indentation)}`;

        return item;
      }

      if (item.includes('{')) {
        indentation += indentSize;
        const indent = ' '.repeat(indentation);
        item += `\n${indent}`;
        item = ' '.repeat(1) + item;

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
