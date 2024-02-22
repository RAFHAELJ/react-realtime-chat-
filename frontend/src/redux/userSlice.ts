import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    nome: '',
    room: '',
  },
  reducers: {
    updateUser: (state, action) => {
      state.nome = action.payload.nome;
      state.room = action.payload.room;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
