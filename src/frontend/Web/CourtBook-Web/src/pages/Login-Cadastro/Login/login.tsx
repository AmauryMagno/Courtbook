import { JSX, useEffect, useState } from "react"
import { Apresentacao, AreaInput, AreaInterrogativa, AreaTexto, AreaTitulo, Botao, Container, LadoDireito, LadoEsquerdo, Texto, TextoApresentacao, TextoLink, Titulo, Input } from "./loginCss"
import { useNavigate } from "react-router-dom";
import { AnimatedText } from "../../../components/animated/animated-text/text";
import { login } from "../../../services/authService";

export const Login = (): JSX.Element => {

    const [isAnimatingExit, setIsAnimatingExit] = useState(false);
    const [isAnimatingLoad, setIsAnimatingLoad] = useState(false);
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = () =>{
        login({
            nomeUsuario: usuario,
            senha: senha
        })
        .then(res => {
            if(res){
                setUsuario('')
                setSenha('')   
            }
            else{
                console.log('Erro', res)
            }
        })
    }

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

    const handleUsuarioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsuario(event.target.value); // Atualiza o estado com o valor do input
    };

    const handleSenhaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSenha(event.target.value); // Atualiza o estado com o valor do input
    };

    return(
        <Container>
            <LadoEsquerdo>
                <AreaInput>
                    <AreaTitulo>
                        <Titulo>Login</Titulo>
                        <Texto> por favor insira seus dados para login</Texto>
                    </AreaTitulo>
                    <Input placeholder="Usuário/Email" value={usuario} onChange={handleUsuarioChange}/>
                    <Input placeholder="Senha" value={senha} onChange={handleSenhaChange}/>
                    <Botao onClick={handleLogin}>Log in</Botao>
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