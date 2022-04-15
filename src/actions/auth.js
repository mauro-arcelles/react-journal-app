import { types } from '../types/types';
import { auth, googleAuthProvider } from '../firebase/firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { removeLoading, startLoading } from './ui';
import Swal from 'sweetalert2';
import { noteLogout } from './notes';

// PARA RECORDAR:
// TODOS LAS ACCIONES ASINCRONAS TIENEN QUE SER UN METODO QUE RETORNA UN CALLBACK
// EN DONDE TENDRÁ EL dispatch Y el getState GRACIAS A redux-thunk


export const startLoginEmailPassword = (email, password) => {

  return (dispatch) => {
    dispatch(startLoading());

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(removeLoading());
      })
      .catch(e => {
        dispatch(removeLoading());
        Swal.fire('Error', 'Username or password are incorrect', 'error');
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {

    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, { displayName: name });

        dispatch(login(user.uid, user.displayName));
      })
      .catch(e => {
        Swal.fire('Error', 'Username already exists', 'error');
      });
  };

};


export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName
  }
});


export const startLogout = () => {
  return async (dispatch) => {

    await signOut(auth);

    dispatch(logout());
    dispatch(noteLogout());

  };
};

export const logout = () => {
  return {
    type: types.logout
  };
};
