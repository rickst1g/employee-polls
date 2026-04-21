import { _saveQuestionAnswer } from './_DATA';

describe('_saveQuestionAnswer', () => {
  test('returns true when valid data is passed', async () => {
    const answer = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne',
    };

    const result = await _saveQuestionAnswer(answer);

    expect(result).toBe(true);
  });

  test('throws an error when incorrect data is passed', async () => {
    const badAnswer = {
      authedUser: 'sarahedo',
      answer: 'optionOne',
    };

    await expect(_saveQuestionAnswer(badAnswer)).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    );
  });
});