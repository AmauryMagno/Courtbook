import { JSX } from "react"
import { BrowserRouter, Route, Routes} from "react-router-dom"
import { Login } from "../pages/Login/login"


export const App = (): JSX.Element => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}