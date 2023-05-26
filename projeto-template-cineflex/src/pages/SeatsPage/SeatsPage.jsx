import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"


export default function SeatsPage(props) {
    const [horarios, setHorarios] = useState(undefined)
    const [color, setColor] = useState({corBorda: "#808F9D", corFundo:"#C3CFD9" });
    const [Assento, setAssento] = useState([])
    const parametros = useParams()
    

    useEffect(() => {

        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametros.idHorario}/seats`
        const promisse = axios.get(url)

        promisse.then(props => {
            setHorarios(props.data)
            //setFilme({ titulo: props.data.title, url: props.data.posterURL })
        })
        promisse.catch(erro => console.log(erro.response.data))

    }, [])
    
    console.log(horarios)
    console.log(Assento)
    


    if (horarios === undefined) {
        return (
            <div>carregando asdas</div>
        )
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {horarios.seats.map(assento => 
                
                <SeatItem disabled={!assento.isAvailable} onClick={()=> MudarCorAssentos(assento.name)} habilitar={assento.isAvailable} corBorda={color.corBorda} corFundo={color.corFundo} key={assento.id}>
                    {assento.name}
                </SeatItem>)}
                
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={horarios.movie.posterURL}  alt="poster" />
                </div>
                <div>
                    <p> {horarios.movie.title} </p>
                    <p>{horarios.day.weekday} - {horarios.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
                
    function MudarCorAssentos(props){
        const NumeroCadeira = props
        for(let i = -1; i < Assento.length; i++){
            if(NumeroCadeira !== Assento[i]){
                Assento.push(NumeroCadeira)
                console.log(Assento)
            }
        }
        
    }
    
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.button`
    border: 1px solid ${props => props.habilitar === false?'#F7C52B': `${props.corBorda}`};;         // Essa cor deve mudar
    background-color: ${props => props.habilitar === false?'#FBE192': `${props.corFundo}`};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`