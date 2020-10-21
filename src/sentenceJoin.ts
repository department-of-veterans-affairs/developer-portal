// Provides english-centric word list construction.
const sentenceJoin = (words: string[]): string => {
  if (words.length === 0) {
    return '';
  } else if (words.length === 1) {
    return words[0];
  } else if (words.length === 2) {
    return `${words[0]} and ${words[1]}`;
  } else {
    const wordsDup = Object.assign([], words) as string[];
    const lastWord = wordsDup.pop() as string;
    wordsDup.push(`and ${lastWord}`);
    return wordsDup.join(', ');
  }
};

export default sentenceJoin;
