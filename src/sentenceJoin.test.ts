import sentenceJoin from './sentenceJoin';

it('Handles an empty list', () => {
  const joined = sentenceJoin([]);
  expect(joined).toEqual('');
});

it('Handles a one-element list', () => {
  const joined = sentenceJoin(['yoda']);
  expect(joined).toEqual('yoda');
});

it('Handles a two-element list', () => {
  const joined = sentenceJoin(['yoda', 'luke']);
  expect(joined).toEqual('yoda and luke');
});

it('Handles a longer list', () => {
  const joined = sentenceJoin(['yoda', 'luke', 'leia', 'han']);
  expect(joined).toEqual('yoda, luke, leia, and han');
});
