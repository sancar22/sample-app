import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces';

const initialState: IUser = {
  id: -1,
  firstName: '',
  surname: '',
  username: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      return {...state, ...action.payload};
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;