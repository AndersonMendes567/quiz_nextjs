import { CountdownCircleTimer } from "react-countdown-circle-timer"
import styles from '../styles/Temporizador.module.css'

interface TemporizadorProp {
  key: any
  duracao: number
  tempoEsgotado(): void
}

export default function Temporizador(props: TemporizadorProp) {

  return (
    <div className={styles.temporizador}>
      <CountdownCircleTimer 
        key={props.key}
        isPlaying
        duration={props.duracao}
        onComplete={props.tempoEsgotado}
        colors={['#45F400', '#F5C901', '#F53300']}
        colorsTime={[props.duracao, props.duracao / 2, 0]}
        size={90}
        strokeWidth={7}
      >{ ({ remainingTime }) => remainingTime }</CountdownCircleTimer>
    </div>
  )
}