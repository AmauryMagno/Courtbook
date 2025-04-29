import { JSX } from "react"
import { BrowserRouter, Route, Routes} from "react-router-dom"
import { Login } from "../pages/Login-Cadastro/Login/login"
import { Cadastro } from "../pages/Login-Cadastro/Cadastro/cadastro"
import { Home } from "../pages/Home/home"
import { Layout } from "../components/NavBar/layout"
import { Quadras } from "../pages/Quadras/quadras"
import { Reservas } from "../pages/Reservas/reservas"
import { Usuarios } from "../pages/Usuarios/usuarios"


export const App = (): JSX.Element => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/cadastro" element={<Cadastro/>}/>
                <Route element={<Layout/>}>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/quadras" element={<Quadras/>}/>
                    <Route path="/reservas" element={<Reservas/>}/>
                    <Route path="/usuarios" element={<Usuarios/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}