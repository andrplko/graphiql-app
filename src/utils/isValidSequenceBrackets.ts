const isValidSequenceBrackets = (value: string) => {
  const stack = [];
  const openBrackets = ['(', '{', '['];
  const closedBrackets = [')', '}', ']'];

  const regex = /[{}()\[\]]/g;
  const matches = value.match(regex);

  if (!matches) {
    return false;
  }

  for (let i = 0; i < matches.length; i += 1) {
    if (openBrackets.includes(matches[i])) {
      stack.push(matches[i]);
    } else if (
      openBrackets.indexOf(stack[stack.length - 1]) ===
      closedBrackets.indexOf(matches[i])
    ) {
      stack.pop();
    } else {
      return false;
    }
  }

  return stack.length === 0;
};

export default isValidSequenceBrackets;
