import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Pruebas en authReducer', () => {

  test('debe de realizar el login', () => {

    const initState = {};

    const action = {
      type: types.login,
      payload: {
        uid: 'abc',
        displayName: 'Juan Perez',
      }
    };

    const state = authReducer(initState, action);

    expect(state).toEqual({
      uid: 'abc',
      name: 'Juan Perez',
    });

  });

  test('debe de realizar el logout', () => {

    const initState = {};

    const action = {
      type: types.logout,
    };

    const state = authReducer(initState, action);

    expect(state).toEqual({});

  });

  test('NO debe de hacer cambios en el state', () => {

    const initState = {};

    const action = {
      type: 'asdasd'
    };

    const state = authReducer(initState, action);

    expect(state).toEqual({});

  });

});