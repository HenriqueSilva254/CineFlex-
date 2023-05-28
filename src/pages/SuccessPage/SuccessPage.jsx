import { Link } from "react-router-dom"
import styled from "styled-components"

export default function SuccessPage(props) {
const info = props.info
console.log(info)
    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer>
                <strong><p>Filme e sessão</p></strong>
                <p>{info.filme}</p>
                <p>{info.data} - {info.horario}</p>
            </TextContainer>

            <TextContainer>
                <strong><p>Ingressos</p></strong>
                {info.assentos.map(assentos => <p>Assento {assentos}</p>)}
            </TextContainer>

            <TextContainer>
                <strong><p>Comprador</p></strong>
                <p>Nome: {info.name}</p>
                <p>CPF: {info.cpf}</p>
            </TextContainer>

            <Link to="/"><Home>Voltar para Home</Home></Link>
        </PageContainer>
    )
}
const Home=styled.button`
    width: 225px;
    height: 42px;
    left: 74px;
    top: 622px;

    background: #E8833A;
    border-radius: 3px;
`

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`