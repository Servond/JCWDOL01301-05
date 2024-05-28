import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { IUsers } from '@/interface/user.interface';
import parseJWT from '@/utils/parseJwt';
import instance from '@/utils/axiosInstance';
type User = {
  id: number;
  userName: string;
  userEmail: string;
  isVerified: boolean;
  roleId: number;
};

type Status = {
  isLogin: boolean;
};

interface Auth {
  user: User;
  status: Status;
}

const initialState: Auth = {
  user: {
    id: 0,
    userName: '',
    userEmail: '',
    isVerified: false,
    roleId: 0,
  },
  status: {
    isLogin: false,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginState: (state: Auth, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      state.status.isLogin = true;
    },
    logoutState: (state: Auth) => {
      state.user = initialState.user;
      state.status = initialState.status;
    },
    tokenValidState: (state: Auth, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      state.status.isLogin = true;
    },
  },
});

export const signIn = (params: IUsers) => async (dispatch: Dispatch) => {
  try {
    const { userEmail, userPassword } = params;

    const { data } = await instance.post('/auth/login', {
      userEmail,
      userPassword,
    });
    const payload = await parseJWT(data?.data?.token);

    dispatch(
      loginState({
        id: payload?.id,
        userName: payload?.userName,
        userEmail: payload?.userEmail,
        isVerified: payload?.isVerified,
        roleId: payload?.roleId,
      }),
    );
    localStorage.setItem('token', String(data?.data?.token));
  } catch (err) {
    console.log(err);
  }
};

export const signOut = () => async (dispatch: Dispatch) => {
  try {
    dispatch(logoutState());
    localStorage.removeItem('token');
  } catch (err) {
    console.log(err);
  }
};

export const checkToken = (token: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await instance.post(
      '/auth/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const payload = await parseJWT(data?.data);
    dispatch(
      tokenValidState({
        id: payload?.id,
        userName: payload?.userName,
        userEmail: payload?.email,
        isVerified: payload?.isVerified,
        roleId: payload?.roleId,
      }),
    );
    localStorage.setItem('token', String(data?.data));
  } catch (err) {
    console.log(err);
  }
};

export const { loginState, logoutState, tokenValidState } = authSlice.actions;

export default authSlice.reducer;
