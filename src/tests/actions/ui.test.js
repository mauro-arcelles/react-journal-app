import { removeError, removeLoading, setError, startLoading } from '../../actions/ui';
import { types } from '../../types/types';

describe('Pruebas en ui-actions', () => {

  test('Todas las acciones deben de funcionar', () => {

    const action = setError('HELP');

    expect(action).toEqual({
      type: types.uiSetError,
      payload: 'HELP'
    });

    const removeErrorAction = removeError();
    const startLoadingAction = startLoading();
    const removeLoadingAction = removeLoading();

    expect(removeErrorAction).toEqual({
      type: types.uiRemoveError
    });
    expect(startLoadingAction).toEqual({
      type: types.uiSetLoading
    });
    expect(removeLoadingAction).toEqual({
      type: types.uiRemoveLoading
    });


  });

});