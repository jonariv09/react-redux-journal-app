import '@testing-library/jest-dom';
import { types } from '../../types/types';

describe('Types testings', () => {
  
  test('Should return the same object than types', () => {

    const mockTypes = {
      login: '[Auth] Login',
      logout: '[Auth] Logout',
    
      uiSetError: '[UI] Set Error',
      uiRemoveError: '[UI] Remove Error',
    
      uiStartLoading: '[UI] Start loading',
      uiFinishLoading: '[UI] Finish loading',
    
      noteAddNew: '[Notes] New note',
      notesActive: '[Notes] Set active note',
      notesLoad: '[Notes] Load notes',
      notesUpdated: '[Notes] Updated note',
      notesFileUrl: '[Notes] Updated image url',
      notesDelete: '[Notes] Delete note',
      notesLogoutCleaning: '[Notes] Logout cleaning',
      noteAddUpdate: '[Notes] Add or Update note'
    } 

    expect(types).toMatchObject(mockTypes);
  })

})
