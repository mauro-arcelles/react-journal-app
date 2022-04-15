import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../hooks/useForm';

export const LoginScreen = () => {

  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: 'nando@gmail.com',
    password: '123456'
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));

  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <>
      <h3 className='auth__title'>Login</h3>

      <form onSubmit={handleLogin} className='animate__animated animate__fadeIn animate__faster'>
        <input type='text' placeholder='Email' name='email' className='auth__input' autoComplete='off' value={email} onChange={handleInputChange} />
        <input type='password' placeholder='Password' name='password' className='auth__input' value={password} onChange={handleInputChange} />

        <button type='submit' className='btn btn-primary btn-block' disabled={loading}>
          {
            loading &&
            (<i className="fa-solid fa-spinner fa-spin"></i>)
          }
          &nbsp;INGRESAR
        </button>

        <div className='auth__social-networks'>
          <p>Login with social networks</p>

          <div className='google-btn' onClick={handleGoogleLogin}>
            <div className='google-icon-wrapper'>
              <img className='google-icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Google-favicon-2015.png/640px-Google-favicon-2015.png' alt='google button' width='100%' height='100' />
            </div>
            <p className='btn-text'>
              <b>Sign in with google</b>
            </p>
          </div>

        </div>
        <Link to='/auth/register' className='link'>
          Create new account
        </Link>

      </form>
    </>

  );
};
