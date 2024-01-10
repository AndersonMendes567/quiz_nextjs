import styles from '../styles/Enunciado.module.css'

interface EnunciadoProps {
  texto: string
}

export default function Enunciado(props: EnunciadoProps) {

  return (
    <div className={styles.enunciado}>
      <h1 className={styles.texto}>{props.texto}</h1>
    </div>
  ) 
}