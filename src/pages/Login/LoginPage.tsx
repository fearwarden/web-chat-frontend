import {Link} from "react-router-dom"
import Router from "../../routers/Router.tsx";
import Logo from "../../assets/img/login.png";
import {useEffect, useState} from "react";
import ErrorMessage from "../../components/notifications/ErrorMessage.tsx";
import { AuthenticationRepository } from "@/app/api/repositories/authentication/AuthenticationRepository.ts";
import {useDispatch} from "react-redux";
import {login} from "@/store/slices/userSlice.ts";

function LoginPage() {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const authRepository = new AuthenticationRepository();
    const dispatch = useDispatch();

    async function handleSignIn() {
        if (!email || !password) {
            setErrorMessage("Email and password are required.")
            return;
        }
        const data = await authRepository.login(email, password);
        console.log(data);
        dispatch(login(data));
    }

    useEffect(() => {
        setTimeout(() => {
            setErrorMessage("")
        }, 5000)
    }, [errorMessage]);

    return (
        <div className="bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
                    <img className="w-16 h-16 mr-2" src={Logo} alt="logo"/>
                    WebChat Application
                </a>
                <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                            Sign in to your account
                        </h1>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your
                                    email</label>
                                <input type="email" name="email" id="email" value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                       placeholder="name@company.com" required/>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                       name="password" id="password" placeholder="••••••••"
                                       className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                       required/>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <a href="#" className="text-sm font-medium hover:underline text-blue-500">Forgot
                                        password?</a>
                                </div>
                            </div>
                            <button type="button" onClick={handleSignIn}
                                    className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-primary-800">Sign
                                in
                            </button>
                            <p className="text-sm font-light text-gray-400">
                                Don’t have an account yet? <Link to={Router.REGISTER}
                                                                 className="font-medium hover:underline text-blue-500">Sign
                                up</Link>
                            </p>
                        {errorMessage && <ErrorMessage message={errorMessage} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;