import { PrimeiroComponente, ArrowFunction } from "../components/PrimeiroComponente";

export default function Home() {
  return (
    <>
    <PrimeiroComponente
      mensagem = 'Passando mensagem como parâmetro'
      mensagemBotao = 'Essa é a mesagem do botão'
      />

    <PrimeiroComponente
      mensagem = 'Outro componente'
      mensagemBotao = 'Clicou em outro componente'
      />

    <PrimeiroComponente
      
      />

    <ArrowFunction/>
    </>
  );
}

