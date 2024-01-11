import QuestaoModel from "@/model/questao"
import styles from '../styles/Questao.module.css'
import Enunciado from "./Enunciado"
import Resposta from "./Resposta"
import Temporizador from "./Temporizador"

interface QuestaoProps {
  valor: QuestaoModel,
  indice: number,
  tempoResposta: number
  respostaSelecionada(indice: number): void
  tempoEsgotado(): void
}

const letra = [
  { valor: 'A', cor: '#F2C866' },
  { valor: 'B', cor: '#F266BA' },
  { valor: 'C', cor: '#85D4F2' },
  { valor: 'D', cor: '#BCE596' },
]

export default function Questao(props: QuestaoProps){
  const questao = props.valor

  function rederizarRespostas() {
    return questao.respostas.map((resposta, i)=> (
      <Resposta 
        key={`${questao.id}-${i}`}
        valor={resposta}
        indice={i}
        letra={letra[i].valor}
        corFundoLetra={letra[i].cor}
        respostaSelecionada={props.respostaSelecionada}
      />
    ))
  }

  return (
    <div className={styles.questao}>
      <Enunciado texto={questao.enunciado} />
      <Temporizador 
        key={questao.id}
        duracao={props.tempoResposta ?? 10}
        tempoEsgotado={props.tempoEsgotado}
      />
      { rederizarRespostas() }
    </div>
  )
}