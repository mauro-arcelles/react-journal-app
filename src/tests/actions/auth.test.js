import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Pruebas en auth-actions', () => {

  beforeEach(() => {
    store = mockStore(initState);
  });

  test('login y logout debeb de crear la accion respectiva', () => {

    const uid = 'ABC123';
    const displayName = 'Juan';

    const loginAction = login(uid, displayName);
    const logoutAction = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName
      }
    });

    expect(logoutAction).toEqual({
      type: types.logout
    });


  });

  test('debe de realizar el startLogout', async () => {

    await store.dispatch(startLogout());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.logout
    });

    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning
    });

  });

  test('debe de inciar el startLoginWithEmailWithPassword', async () => {

    // await store.dispatch(startLoginEmailPassword('test@testing.com', '123456'));

    // const actions = store.getActions();

    // console.log(actions);

    // expect(actions[1]).toEqual({
    //   type: types.startLoading,
    //   payload: {
    //     uid: 'PwMvhN89xYSikhURucK8MctZvmJ3',
    //     displayName: null
    //   }
    // });

  });

});