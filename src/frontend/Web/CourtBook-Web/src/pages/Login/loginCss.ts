import styled from 'styled-components'
import bkg_image from '../../assets/img-bkg-login.webp' 

export const Container = styled.div`
    display: flex;
    height: 100vh;
`
export const LadoEsquerdo = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LadoDireito = styled.div`
  flex: 1;
  background-image: url(${bkg_image});
  background-size: 200%;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Apresentacao = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75%;
    height: 90%;

    background: rgba(255, 255, 255, 0.17);
    border-radius: 30px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.2px);
    -webkit-backdrop-filter: blur(6.2px);
`
export const AreaTexto = styled.div`
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    width: 60%;
`

export const TextoApresentacao = styled.text`
    font-size: 3rem;
    font-weight: 350;
`