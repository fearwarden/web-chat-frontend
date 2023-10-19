import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/Home/HomePage.tsx";
import LoginPage from "../pages/Login/LoginPage.tsx";
import RegisterPage from "../pages/Register/RegisterPage.tsx";

export default class Router {
    public static readonly HOME = "/";
    public static readonly LOGIN = "/login"
    public static readonly REGISTER = "/register"

    public static readonly router = createBrowserRouter([
        {
            path: Router.HOME,
            element: <HomePage />
        },
        {
            path: Router.LOGIN,
            element: <LoginPage />
        },
        {
            path: Router.REGISTER,
            element: <RegisterPage />
        }
    ])
}