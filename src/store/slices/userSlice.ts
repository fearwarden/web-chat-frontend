import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserState {
    id: string;
    email: string;
    username: string;
}

const initialState: UserState = {
    id: "",
    email: "",
    username: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserState>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.username = action.payload.username;
        },
        logout: (state) => {
            state.id = "";
            state.email = "";
            state.username = "";
        }
    }
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;