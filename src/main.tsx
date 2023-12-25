import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import Router from "../src/routers/Router.tsx";
import {Provider} from "react-redux";
import {store} from "@/store/store.ts";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "@/dev";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
            <RouterProvider router={Router.router}/>
        </DevSupport>
    </Provider>
)
