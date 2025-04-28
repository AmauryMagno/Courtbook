import { JSX, useEffect, useState } from "react"
import { Apresentacao, AreaInput, AreaInput2, AreaInterrogativa, AreaTexto, AreaTitulo, Botao, Container, Input, LadoDireito, LadoEsquerdo, Texto, TextoApresentacao, TextoLink, Titulo } from "./cadastroCss"
import { AnimatedText } from "../../../components/animated/animated-text/text"
import { useNavigate } from "react-router-dom";

export const Cadastro = (): JSX.Element => {

    const [isAnimatingExit, setIsAnimatingExit] = useState(false);
        const [isAnimatingLoad, setIsAnimatingLoad] = useState(false);
        const navigate = useNavigate();
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimatingLoad(true);
        }, 50);
        return () => clearTimeout(timer)
    }, []);

    const navigateToLogin = () => {
        setIsAnimatingExit(true);

        setTimeout(() => {
            navigate('/')
        }, 750);
    }

    return(
        <Container>
            <LadoDireito isAnimating={isAnimatingExit}>
                <Apresentacao>
                    <AreaTexto>
                        <TextoApresentacao>
                            <AnimatedText text="Vamos" isAnimatingLoad={isAnimatingLoad} isAnimatingExit={isAnimatingExit}/>
                        </TextoApresentacao>
                        <TextoApresentacao>
                            <AnimatedText text="Começar!" isAnimatingLoad={isAnimatingLoad} isAnimatingExit={isAnimatingExit}/>
                        </TextoApresentacao>
                    </AreaTexto>
                </Apresentacao>
            </LadoDireito>
            <LadoEsquerdo>
                <AreaInput>
                    <AreaTitulo>
                        <Titulo>Criar Conta</Titulo>
                    </AreaTitulo>
                    <AreaInput2>
                        <Input placeholder="Nome"/>
                        <Input placeholder="Sobrenome"/>
                    </AreaInput2>
                    <Input placeholder="Usuário"/>
                    <AreaInput2>
                        <Input placeholder="Senha"/>
                        <Input placeholder="Confirmar Senha"/>
                    </AreaInput2>
                    <Input placeholder="Email"/>
                    
                    <Botao> Criar Conta </Botao>
                    <AreaInterrogativa>
                        <Texto>
                            Já tenho uma conta?
                        </Texto>
                        <TextoLink onClick={navigateToLogin}>Fazer Login</TextoLink>
                    </AreaInterrogativa>
                </AreaInput>
            </LadoEsquerdo>
        </Container>
    )
}