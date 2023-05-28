import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"


export default function SeatsPage(props) {
    const navigate = useNavigate()
    const [horarios, setHorarios] = useState(undefined)
    const [color, setColor] = useState({ corBorda: "#808F9D", corFundo: "#C3CFD9",corBordaSelecionada:"#0E7D71", corFundoSelecionada:"#1AAE9E" });
    const [ids, setIds] = useState([])
    const [AssentoRepetido, setAssentoRepetido] = useState([])
    const parametros = useParams()
    const [name, setName] = useState([])
    const [cpf, setCpf] = useState([])
    const [AssentosIniciais, setAssentosIniciais] = useState([
        {id: 4951, name: '2', isAvailable: false},
        {id: 4952, name: '3', isAvailable: false}])
    

    useEffect(() => {

        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametros.idSessao}/seats`
        const promisse = axios.get(url)

        promisse.then(props => {
            setHorarios(props.data)
            setAssentosIniciais(props.data.seats)
            console.log(props)
            //setFilme({ titulo: props.data.title, url: props.data.posterURL })
        })
        promisse.catch(erro => console.log(erro.response.data))

    }, [])


    if (horarios === undefined) {
        return (
            <div>carregando asdas</div>
        )
    }
   
    

    console.log(horarios.name)
    
    
    props.info.data = `${horarios.day.weekday}`
    props.info.horario = `${horarios.name}`  
    const [novasInfos, setnovasInfos] = [{...props.info}]

    console.log(ids)

    function setarVariavel(props){
        novasInfos.name = name
        novasInfos.cpf = cpf
        props.set(novasInfos)
    
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {AssentosIniciais.map((assento, index) =>

                    <SeatItem 
                    data-test="seat"
                    name={"teste"} 
                    disabled={!assento.isAvailable} 
                    onClick={(e) => MudarCorAssentos(index, assento)} 
                    habilitar={assento.isAvailable} 
                    corBorda={color.corBorda} 
                    corFundo={color.corFundo} 
                    key={assento.id}
                    cor={assento.cor === "True"? `${assento.cor}`:'False'}
                    >
                    
                    {assento.name}
                    </SeatItem>)
                    
                    }

            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle Borda="#0E7D71" Fundo="#1AAE9E" />
                    name
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle Borda="#7B8B99" Fundo="#C3CFD9" />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle Borda="#F7C52B" Fundo="#FBE192" />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={FazerPost}>
                <label htmlFor="nome">Nome do Comprador:</label>

                <input
                    data-test="client-name"
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="Digite seu nome..."
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />

                <label htmlFor="cpf">CPF do Comprador:</label>

                <input
                    data-test="client-cpf"
                    id="cpf"
                    name="cpf"
                    placeholder="Digite seu CPF..."
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                    
                    required
                />

                <button data-test="book-seat-btn" onClick={() => setarVariavel(props)}>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={horarios.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p> {horarios.movie.title} </p>
                    <p>{horarios.day.weekday} - {horarios.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
    
    function FazerPost(e) {
        e.preventDefault();
        const url = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many"
        const dados = {
            ids,
            name,
            cpf
        }
        const promisse = axios.post(url, dados)
        promisse.then(resposta => navigate("/success") )
        promisse.catch(erro => alert(erro.response.data))
            
        console.log(props)        

    }

    function MudarCorAssentos(i, props) {
        const teste = [...AssentosIniciais]
        teste[i].cor = "True"
        setAssentosIniciais(teste)


      
        const NumeroCadeira = props.id
        let repetidos = 0
        let repeticaoArray = 0
        for (let i = -1; i < ids.length; i++) {
            if (NumeroCadeira !== ids[i]) {
                repetidos = NumeroCadeira
            } else {
                repeticaoArray = 1
                repetidos = 0
            }
        }

        if (repetidos !== 0 && repeticaoArray === 0) {

            ids.push(NumeroCadeira)
            novasInfos.assentos.push(props.name)
    
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
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        margin-top: 60px;
        align-self: center;
        
        width: 225px;
        height: 42px;
        left: 74px;
        top: 622px;

        background: #E8833A;
        border-radius: 3px;
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
    border: 1px solid ${props => props.Borda};         // Essa cor deve mudar
    background-color: ${props => props.Fundo};    // Essa cor deve mudar
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
    border: 1px solid ${props => props.habilitar === false ? '#F7C52B' : props.cor === "False"? `${props.corBorda}`: "#0E7D71"}   ;        // Essa cor deve mudar
    background-color: ${props => props.habilitar === false ? '#FBE192' : props.cor === "False"? `${props.corFundo}`: "#1AAE9E"}   ;    // Essa cor deve mudar
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