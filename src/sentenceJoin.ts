// Provides english-centric word list construction.
function sentenceJoin(words: string[]) {
  if (words.length === 0) {
    return '';
  } else if (words.length === 1) {
    return words[0];
  } else if (words.length === 2) {
    return `${words[0]} and ${words[1]}`;
  } else {
    const wordsDup = Object.assign([], words);
    const lastWord = wordsDup.pop();
    wordsDup.push(`and ${lastWord}`);
    return wordsDup.join(', ');
  }
}

export default sentenceJoin;
