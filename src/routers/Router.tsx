import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/Home/HomePage.tsx";
import LoginPage from "../pages/Login/LoginPage.tsx";
import RegisterPage from "../pages/Register/RegisterPage.tsx";
import { HOME, LOGIN, REGISTER } from "@/constants/constants.ts";

export default class Router {

    public static readonly router = createBrowserRouter([
        {
            path: HOME,
            element: <HomePage />
        },
        {
            path: LOGIN,
            element: <LoginPage />
        },
        {
            path: REGISTER,
            element: <RegisterPage />
        }
    ])
}