import { _saveQuestion } from './_DATA';

describe('_saveQuestion', () => {
  test('returns the saved question when valid data is passed', async () => {
    const question = {
      optionOneText: 'Option One',
      optionTwoText: 'Option Two',
      author: 'sarahedo',
    };

    const result = await _saveQuestion(question);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('timestamp');
    expect(result.optionOne.text).toBe('Option One');
    expect(result.optionTwo.text).toBe('Option Two');
    expect(result.author).toBe('sarahedo');
  });

  test('throws an error when incorrect data is passed', async () => {
    const badQuestion = {
      optionOneText: '',
      author: 'sarahedo',
    };

    await expect(_saveQuestion(badQuestion)).rejects.toEqual(
      'Please provide optionOneText, optionTwoText, and author'
    );
  });
});