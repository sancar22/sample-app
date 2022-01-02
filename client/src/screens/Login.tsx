import { Link } from 'react-router-dom';
import { routes } from '../routes/index';

function Login () {
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Logging in...');
  };
  return (
    <form className='main-view' onSubmit={handleLogin}>    
      <input type="text" placeholder="Username"/>
      <input type="password" placeholder="Password"/>
      <button type="submit">Login</button>
      <Link to={routes.REGISTER} className='link'> 
        <button>Register</button>
      </Link>
    </form>
  );
}

export default Login;