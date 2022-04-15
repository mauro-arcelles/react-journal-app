import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { mount } from 'enzyme/build';
import { Provider } from 'react-redux';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => {
  return {
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
  };
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <LoginScreen />', () => {

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    </Provider>
  );

  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();

  });

  test('debe de disparar la accion de startGoogleLogin', () => {

    wrapper.find('.google-btn').prop('onClick')();

    expect(startGoogleLogin).toHaveBeenCalled();


  });

  test('debe de disparar el startLogin con los respectivos elementos', () => {

    wrapper.find('form').simulate('submit', {
      preventDefault: () => { }
    });

    expect(startLoginEmailPassword).toHaveBeenCalledWith('nando@gmail.com', '123456');

  });

});