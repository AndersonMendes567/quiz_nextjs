import QuestaoModel from "@/model/questao"
import Botao from "./Botao"
import Questao from "./Questao"
import styles from '../styles/Questionario.module.css'

interface QuestionarioProps {
  questao: QuestaoModel
  ultima: boolean
  questaoRespondida: (questao: QuestaoModel)=> void
  proximoPasso: ()=> void
}

export default function Questionario(props: QuestionarioProps) {

  function respostaFornecida(indice: number) {
    if (props.questao.naoRespondida) {
      props.questaoRespondida(props.questao.responderCom(indice))
    }
  }

  return (
    <div className={styles.questionario}>
      <Questao 
        valor={props.questao} 
        indice={0} 
        tempoResposta={10}
        respostaSelecionada={respostaFornecida}
        tempoEsgotado={props.proximoPasso}
      />
      <Botao 
        texto={props.ultima ? 'Mostrar resultados' : 'Próxima'} 
        onClick={props.proximoPasso}
      />
    </div>
  )
}