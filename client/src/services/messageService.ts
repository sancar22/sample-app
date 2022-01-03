const baseURL: string | undefined = process.env.REACT_APP_API_URL;

const getAllMessages = (jwt: string | null) => {
  return fetch(baseURL + '/api/message/getAll', {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const postMessage = (message: string, jwt: string | null) => {
  return fetch(baseURL + '/api/message/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({message}),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const messageService = { getAllMessages, postMessage };
