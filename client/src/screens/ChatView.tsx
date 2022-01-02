import { useEffect} from 'react';
import { userService } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setUser } from '../redux/slices/user';
import { toast } from 'react-toastify';
import CustomToast from '../components/CustomToast';
import { IUser } from '../interfaces';

function ChatView () {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user: IUser  = useSelector((state: RootState) => state.user);

  const getUserInfo = async () => {
    const jwt = localStorage.getItem('jwt');
    const {res, error} =  await userService.getUserById(jwt);
    if (error) {
      toast(<CustomToast title={res} />);
      navigate(routes.HOME);
    } else {
      dispatch(setUser(res));
    }
  };
  
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="container">
      <div className="info-bar">
        <div>Logged in as: {user.username}</div>
        <button className='logout'>Logout</button>
      </div>
      <div className="messages-container">
        <div className='left message'>Hola cami churro</div>
        <div className='right message'>Hola santi churro</div>
      </div>
      <form className="input-container">
        <textarea placeholder="Type a message" />
        <input type="submit" value="SEND" className="send-button" />
      </form>
    </div>
  );
};

export default ChatView;
