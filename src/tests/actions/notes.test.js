/**

* @jest-environment node

*/
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';

jest.mock("../../helpers/fileUpload", () => {
  return {
    fileUpload: () => {
      return Promise.resolve("https://hola-mundo.com");
    },
  };
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: 'abc123'
  },
  notes: {
    active: {
      id: '7ymDdRRjeRVF6SzFis8q',
      title: 'hola',
      body: 'mundo',
    }
  }
};

let store = mockStore(initState);

describe('Prueba con las acciones de notes', () => {

  beforeEach(() => {
    store = mockStore(initState);
  });

  test('debe de crear una nueva nota startNewNote', async () => {

    await store.dispatch(startNewNote());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number)
      }
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number)
      }
    });

    const docId = actions[1].payload.id;
    const noteRef = doc(db, `abc123/journal/notes/${docId}`);
    await deleteDoc(noteRef);


  });

  test('startLoadingNotes debe de cargar las notas', async () => {

    await store.dispatch(startLoadingNotes('abc123'));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array)
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
      url: expect.any(String)
    };

    expect(actions[0].payload[0]).toEqual(expected);


  });

  test('startSaveNote debe de actualizar la nota', async () => {

    const note = {
      id: '7ymDdRRjeRVF6SzFis8q',
      title: 'titulo',
      body: 'body',
    };

    await store.dispatch(startSaveNote(note));

    const actions = store.getActions();

    expect(actions[0].type).toBe(types.notesUpdated);

    const getDocumentRef = await getDoc(doc(db, "abc123", "journal", "notes", `${note.id}`));

    expect(getDocumentRef.data().title).toBe(note.title);

  });

  test('startLoading debe de actualizar el url del entry', async () => {

    const file = [];

    await store.dispatch(startUploading(file));

    const getDocumentRef = await getDoc(doc(db, "abc123", "journal", "notes", '7ymDdRRjeRVF6SzFis8q'));
    expect(getDocumentRef.data().url).toBe('https://hola-mundo.com');

  });

});