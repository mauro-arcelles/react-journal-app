import { types } from '../../types/types';

describe('Pruebas en types', () => {

  test('debe de retornar el objeto correctamente', () => {

    expect(types).toEqual({
      login: '[auth] Login',
      logout: '[auth] Logout',

      uiSetError: '[ui] Set Error',
      uiRemoveError: '[ui] Remove Error',

      uiSetLoading: '[ui] Set Loading',
      uiRemoveLoading: '[ui] Remove Loading',

      notesAddNew: '[notes] New note',
      notesActive: '[notes] Set active note',
      notesLoad: '[notes] Load notes',
      notesUpdated: '[notes] Updated note',
      notesFileUrl: '[notes] Updated image url',
      notesDelete: '[notes] Delete note',
      notesLogoutCleaning: '[notes] Notes logout Cleaning',
    });
  });

});