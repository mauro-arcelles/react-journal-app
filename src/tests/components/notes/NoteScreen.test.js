import { mount } from 'enzyme/build';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { activeNote } from '../../../actions/notes';
import { Sidebar } from '../../../components/journal/Sidebar';
import { NoteScreen } from '../../../components/notes/NoteScreen';

jest.mock("../../../actions/notes", () => {
  return {
    activeNote: jest.fn(),
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
    active: {
      id: 'abc123',
      title: 'Note title',
      body: 'Note body',
    },
    notes: []
  }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <NoteScreen />
    </MemoryRouter>
  </Provider>
);

describe('Pruebas en <NoteScreen />', () => {

  test('debe de mostrarse correctamente', () => {

    expect(wrapper).toMatchSnapshot();


  });

  test('debe de disparar el active note', () => {

    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "New title"
      }
    });

    expect(activeNote).toHaveBeenCalledWith('abc123', {
      body: 'Note body',
      title: 'New title',
      id: 'abc123'
    });

  });

});