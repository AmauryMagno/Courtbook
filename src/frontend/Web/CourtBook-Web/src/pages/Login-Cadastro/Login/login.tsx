import { JSX, useEffect, useState } from "react"
import { Apresentacao, AreaInput, AreaInterrogativa, AreaTexto, AreaTitulo, Botao, Container, LadoDireito, LadoEsquerdo, Texto, TextoApresentacao, TextoLink, Titulo, Input } from "./loginCss"
import { useNavigate } from "react-router-dom";
import { AnimatedText } from "../../../components/animated/animated-text/text";

export const Login = (): JSX.Element => {

    const [isAnimatingExit, setIsAnimatingExit] = useState(false);
    const [isAnimatingLoad, setIsAnimatingLoad] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimatingLoad(true);
        }, 50);
        return () => clearTimeout(timer)
    }, []);

    const navigateToCadastro = () => {
        setIsAnimatingExit(true);

        setTimeout(() => {
            navigate('/cadastro')
        }, 750);
    }

    return(
        <Container>
            <LadoEsquerdo>
                <AreaInput>
                    <AreaTitulo>
                        <Titulo>Login</Titulo>
                        <Texto> por favor insira seus dados para login</Texto>
                    </AreaTitulo>
                    <Input placeholder="Usuário/Email"/>
                    <Input placeholder="Senha"/>
                    <Botao>Log in</Botao>
                    <AreaInterrogativa>
                        <Texto>
                            Não tenho uma conta!
                        </Texto>
                        <TextoLink onClick={navigateToCadastro}>Criar Conta</TextoLink>
                    </AreaInterrogativa>
                     
                </AreaInput>
            </LadoEsquerdo>
            <LadoDireito isAnimating={isAnimatingExit}>
                <Apresentacao>
                    <AreaTexto>
                        <TextoApresentacao>
                            <AnimatedText text="Bem vindo" isAnimatingLoad={isAnimatingLoad} isAnimatingExit={isAnimatingExit}/>
                        </TextoApresentacao>
                        <TextoApresentacao>
                            <AnimatedText text="de volta!" isAnimatingLoad={isAnimatingLoad} isAnimatingExit={isAnimatingExit}/>
                        </TextoApresentacao>
                    </AreaTexto>
                </Apresentacao>
            </LadoDireito>
        </Container>
    )
}