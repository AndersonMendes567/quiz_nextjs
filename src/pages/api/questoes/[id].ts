import { questoes } from "@/data/bancoDeQuestoes";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default function handler(req: any, res: any){
  const id = +req.query.id
  const questaoSelecionada = questoes.filter(questao=> questao.id === id)[0]

  if(!questaoSelecionada) return res.status(204).send()
  //const questaoRespondida = questaoSelecionada.embaralharRespostas().responderCom(2)

  res.status(200).json(questaoSelecionada.paraObjeto())
}