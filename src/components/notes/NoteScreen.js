import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

  const dispatch = useDispatch();

  const { active: noteActive } = useSelector(state => state.notes);
  const [formValues, handleInputChange, reset] = useForm(noteActive);

  const { body, title } = formValues;

  const activeId = useRef(noteActive.id);

  useEffect(() => {
    if (noteActive.id !== activeId.current) {
      reset(noteActive);
      activeId.current = noteActive.id;
    }
  }, [noteActive, reset]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));

  }, [formValues, dispatch]);

  const handleDelete = () => {
    dispatch(startDeleting(noteActive.id));
  };

  return (
    <div className='notes__main-content' >

      <NotesAppBar />

      <div className='notes__content'>

        <input type="text" placeholder='Some awesome title' className='notes__title-input' autoComplete='off' value={title} onChange={handleInputChange} name='title' />
        <textarea placeholder='What happen today?' className='notes__textarea' autoComplete='off' value={body} onChange={handleInputChange} name='body'></textarea>

        {
          (noteActive.url) &&
          (<div className="notes__image">
            <img src={noteActive.url} alt="imagen" width='100%' height='100%' />
          </div>)
        }

      </div>

      <button className='btn btn-danger' onClick={handleDelete}>
        Delete
      </button>

    </div >
  );
};
