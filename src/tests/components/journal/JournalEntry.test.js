import { mount } from 'enzyme/build';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { activeNote } from '../../../actions/notes';
import { JournalEntry } from '../../../components/journal/JournalEntry';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const nota = {
  id: 10,
  date: 0,
  title: 'Hola',
  body: 'Mundo',
  url: 'https://algunalugar.com/foto.jps'
};

const wrapper = mount(
  <Provider store={store}>
    <JournalEntry {...nota} />
  </Provider>
);


describe('Prueba en <JournalEntry />', () => {

  test('debe de mostrarse correctamente', () => {

    expect(wrapper).toMatchSnapshot();

  });

  test('debe de activar la nota', () => {

    wrapper.find('.journal__entry').prop('onClick')();

    expect(store.dispatch).toHaveBeenCalledWith(activeNote(nota.id, { ...nota }));

  });


});