import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"


export default function SessionsPage(props) {
    const [horarios, setHorarios] = useState(undefined)
    const [filme, setFilme] = useState("")
    const parametros = useParams()

    useEffect(() => {

        const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${parametros.idFilme}/showtimes`
        const promisse = axios.get(url)

        promisse.then(props => {
            setHorarios(props.data.days)
            setFilme({ titulo: props.data.title, url: props.data.posterURL })
        })
        promisse.catch(erro => console.log(erro.response.data))

    }, [])


    props.info.filme = `${filme.titulo}`
    const [novasInfos, setnovasInfos] = [{...props.info}]
    


    if (horarios === undefined) {
        return (
            <div>carregando asdas</div>
        )
    }
    
    function setarVariavel(props){
        props.set(novasInfos)
    }
    return (
        <PageContainer>
            Selecione o horário
            <div>
                {horarios.map(horario =>

                    <SessionContainer data-test="movie-day" key={horario.id}>
                        {horario.weekday} - {horario.date}
                        <ButtonsContainer onClick={() => setarVariavel(props)}>
                            <Link data-test="showtime" to={`/assentos/${horario.showtimes[0].id}`}><button>{horario.showtimes[0].name}</button> </Link>
                            <Link data-test="showtime" to={`/assentos/${horario.showtimes[1].id}`}><button>{horario.showtimes[1].name}</button></Link>
                        </ButtonsContainer>
                    </SessionContainer>)}
            </div>

            <FooterContainer data-test="footer">
                <div>
                    <img src={filme.url} alt="poster" />
                </div>
                <div>
                    <p>{filme.titulo}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        width: 83px;
        height: 43px;
        left: 23px;
        top: 227px;

        background: #E8833A;
        border-radius: 3px;
        margin-right: 20px;
        border: 0px;


        font-family: Roboto;
        font-size: 18px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0.02em;
        text-align: center;
        color: white;
    }
    a {
        text-decoration: none;
    }
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