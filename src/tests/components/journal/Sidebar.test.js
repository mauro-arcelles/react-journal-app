import { mount } from 'enzyme/build';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';
import { Sidebar } from '../../../components/journal/Sidebar';


jest.mock("../../../actions/auth", () => {
  return {
    startLogout: jest.fn(),
  };
});

jest.mock("../../../actions/notes", () => {
  return {
    startNewNote: jest.fn(),
  };
});


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: 'abc123',
    name: 'Adrian'
  },
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    active: null,
    notes: []
  }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  </Provider>
);

describe('Pruebas en <Sidebar />', () => {

  test('debe de mostrarse correctamente', () => {

    expect(wrapper).toMatchSnapshot();

  });

  test('debe de llamar el startLogout', () => {

    wrapper.find('button').prop('onClick')();

    expect(startLogout).toHaveBeenCalled();


  });

  test('debe de llamar el startNewNote', () => {

    wrapper.find('.journal__new-entry').prop('onClick')();

    expect(startNewNote).toHaveBeenCalled();

  });

});