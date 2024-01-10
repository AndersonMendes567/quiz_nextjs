import { questoes } from "@/data/bancoDeQuestoes";
import { embaralhar } from "@/functions/array";

export default function handler(req: any, res: any) {
  const questaoIds = questoes.map(questao => questao.id)
  const questoesEmbaralhadas = embaralhar(questaoIds)

  res.status(200).json(questoesEmbaralhadas)
}