import { routes } from './routes';
import Register from './screens/Register';
import Login from './screens/Login';
import ChatView from './screens/ChatView';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  autoClose: 8000,
  draggable: false,
});

function App () {

  return (
    <>
      <Router>
        <Routes>
          <Route path={routes.HOME} element={<Login/>}>
          </Route>
          <Route path={routes.REGISTER} element={<Register/>}>
          </Route>
          <Route path={routes.CHAT} element={<ChatView/>}></Route>
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
