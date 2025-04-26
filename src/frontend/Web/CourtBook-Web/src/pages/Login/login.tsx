import { JSX } from "react"
import { Apresentacao, AreaTexto, Container, LadoDireito, LadoEsquerdo, TextoApresentacao } from "./loginCss"

export const Login = (): JSX.Element => {
    return(
        <Container>
            <LadoEsquerdo>
                <h2>Lado Esquerdo</h2>
            </LadoEsquerdo>
            <LadoDireito>
                <Apresentacao>
                    <AreaTexto>
                        <TextoApresentacao>Welcome</TextoApresentacao>
                        <TextoApresentacao>back!</TextoApresentacao>
                    </AreaTexto>
                </Apresentacao>
            </LadoDireito>
        </Container>
    )
}