import Questionario from '@/components/Questionario'
import QuestaoModel from '@/model/questao'
import { Poppins } from 'next/font/google'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const poppins = Poppins({ subsets: ['latin'], weight: ['200', '400', '600', '700'] })

export default function Home() {
  const [questao, setQuestao] = useState<QuestaoModel | null>(null)
  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [questoesCertas, setQuestoesCertas] = useState<number>(0)
  const route = useRouter()

  async function obterIdsDasQuestoes() {
    const resp = await fetch(`/api/questionario`)
    const idsDasQuestoes = await resp.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }

  async function obterQuestao(idDaQuestao: number) {
    const resp = await fetch(`/api/questoes/${idDaQuestao}`)
    const json = await resp.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json)
    setQuestao(novaQuestao.embaralharRespostas())
  }

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida)
    const incremento = questaoRespondida.acertou ? 1 : 0
    setQuestoesCertas(questoesCertas => questoesCertas + incremento)
  }

  function idProximaQuestao() {
    if (questao) {
      const indiceAtual = idsDasQuestoes.indexOf(questao.id)
      return idsDasQuestoes[indiceAtual + 1]
    } 
  }

  function proximoPasso() {
    const idQuestao = idProximaQuestao()

    if(idQuestao) {
      proximaQuestao(idQuestao)
    } else {
      finalizar()
    }
  }

  function proximaQuestao(idQuestao: number) {
    obterQuestao(idQuestao)
  }

  function finalizar() {
    route.push({
      pathname: '/resultados',
      query: {
        total: idsDasQuestoes.length,
        certas: questoesCertas
      }
    })
  }

  useEffect(()=> {
    obterIdsDasQuestoes()
  }, [])

  useEffect(()=> {
    idsDasQuestoes.length && obterQuestao(idsDasQuestoes[0])
  }, [idsDasQuestoes])

  return (
    <main
      className={`
        flex min-h-screen flex-col items-center justify-center px-12 
        ${poppins.className} 
      `}
    >
      { questao &&
        <Questionario 
          questao={questao}
          ultima={!idProximaQuestao()}
          questaoRespondida={questaoRespondida}
          proximoPasso={proximoPasso}
        />
      } 
    </main>
  )
}
