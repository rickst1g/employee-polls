import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Navigation from '../Nav';

const mockStore = configureStore([]);

describe('Navigation Snapshot', () => {
  it('matches the snapshot', () => {
    const store = mockStore({
      authedUser: 'sarahedo',
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          avatarURL: 'avatar.jpg',
        },
      },
    });

    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <Navigation />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});