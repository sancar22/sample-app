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
      console.log(res);
      dispatch(setUser(res));
    }

  };
  
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>Here: {user.firstName}</div>
  );
};

export default ChatView;
