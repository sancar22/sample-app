const baseURL: string | undefined = process.env.REACT_APP_API_URL;

const getUserById = (jwt: string | null) => {
  return fetch(baseURL + '/api/user/getInfo', {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const userService = { getUserById };
