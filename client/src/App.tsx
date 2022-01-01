import React from 'react';
import './App.scss';
import useLocalStorage from './customHooks/useLocalStorage';
import useApi from './customHooks/useApi';

type ResponseApi = {
  user: string;
  lastName: string;
}
type ErrorApi = {
  error: string;
}

function App () {
  const [name, setName] = useLocalStorage<string>('name', 'Santiago');
  const [result, error] = useApi<ResponseApi[], ErrorApi>('http://localhost:5000/api/user/okasdf');

  return (
    <div>
      <input
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      ></input>
      {error && <div>There was an error</div>}
      <div>{result?.map((res, index) => <div key={index}>{res.lastName}</div>)}</div>
    </div>
  );
}

export default App;
