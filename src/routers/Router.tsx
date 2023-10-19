import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/Home/HomePage.tsx";

export default class Router {
    public static readonly HOME = "/";

    public static readonly router = createBrowserRouter([
        {
            path: Router.HOME,
            element: <HomePage />
        }
    ])
}