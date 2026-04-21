import authedUser from './authedUser';
import { SET_AUTHED_USER, LOGOUT_AUTHED_USER } from '../actions/authedUser';

describe('authedUser reducer', () => {
  test('returns the initial state when no action is passed', () => {
    const result = authedUser(undefined, {});
    expect(result).toBe(null);
  });

  test('handles SET_AUTHED_USER', () => {
    const action = {
      type: SET_AUTHED_USER,
      id: 'sarahedo',
    };

    const result = authedUser(null, action);
    expect(result).toBe('sarahedo');
  });

  test('handles LOGOUT_AUTHED_USER', () => {
    const action = {
      type: LOGOUT_AUTHED_USER,
    };

    const result = authedUser('sarahedo', action);
    expect(result).toBe(null);
  });

  test('returns current state for unknown action types', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
    };

    const result = authedUser('tylermcginnis', action);
    expect(result).toBe('tylermcginnis');
  });
});
