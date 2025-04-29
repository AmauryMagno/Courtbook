import { JSX } from "react"
import { BrowserRouter, Route, Routes} from "react-router-dom"
import { Login } from "../pages/Login-Cadastro/Login/login"
import { Cadastro } from "../pages/Login-Cadastro/Cadastro/cadastro"
import { Home } from "../pages/Home/home"


export const App = (): JSX.Element => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/cadastro" element={<Cadastro/>}/>
                <Route path="/home" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}