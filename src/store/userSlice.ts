import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface UserInfo {
  id: number
  userName: string
  roleName: string
}

interface UserState {
  userInfo: UserInfo | null
}

const initialState: UserState = {
  userInfo: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer