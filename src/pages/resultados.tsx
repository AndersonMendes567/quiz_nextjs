import Botao from "@/components/Botao";
import Estatistica from "@/components/Estatistica";
import { useRouter } from "next/router";
import styles from '../styles/Resultados.module.css'

export default function Resultados() {
  const route = useRouter()
  const total = getString(route.query.total || '0')
  const certas = getString(route.query.certas || '0') 

  function getString(value: string[] | string) {
    if (Array.isArray(value)) {
      return value[0]
    } else {
      return value
    }

  }

  return (
    <div className={styles.resultados}>
      <h1 className={styles.titulo}>Resultado Final</h1>
      <div className={styles.wrapp}>
        <Estatistica texto="Respostas" valor={total} />
        <Estatistica texto="Certas" valor={certas} corFundo="#9CD2A4" />
        <Estatistica 
          texto="Percentual" 
          valor={`${parseInt(certas) / parseInt(total) * 100}%`}
          corFundo="#DE6A33"
        />
      </div>
      <Botao 
        href="/"
        texto="Tentar novamente"
      />
    </div>
  )
}