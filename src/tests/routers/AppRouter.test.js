import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { mount } from 'enzyme/build';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../routers/AppRouter';
import { act } from 'react-dom/test-utils';
import { auth, db } from '../../firebase/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { login } from '../../actions/auth';

jest.mock('../../actions/auth', () => {
  return {
    login: jest.fn(),
  };
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    active: {
      id: 'abc',
    },
    notes: []
  }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {

  test('debe de llamar el login si estoy autenticado', async () => {
    let user;

    await act(async () => {
      const userCred = await signInWithEmailAndPassword(auth, 'test@testing.com', '123456');
      user = userCred.user;

      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(login).toHaveBeenCalledWith('PwMvhN89xYSikhURucK8MctZvmJ3', null);


  });

});