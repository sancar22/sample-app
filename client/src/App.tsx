// import useLocalStorage from './customHooks/useLocalStorage';
// import useApi from './customHooks/useApi';
import Register from './screens/Register';
import Login from './screens/Login';
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
// type ResponseApi = {
//     user: string;
//     lastName: string;
// };
// type ErrorApi = {
//     error: string;
// };

function App () {
  // const [name, setName] = useLocalStorage<string>('name', 'Santiago');
  // const [result, error] = useApi<ResponseApi[], ErrorApi>(
  //   'http://localhost:5000/api/user/okasdf'
  // );
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}>
          </Route>
          <Route path="/register" element={<Register/>}>
          </Route>
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
