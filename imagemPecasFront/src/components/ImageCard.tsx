// =====================================================================
// ImageCard.tsx — componente que mostra UMA imagem em formato de card
// =====================================================================

// "Props" são as informações que o componente recebe de quem o usa
// (no nosso caso, da GaleriaPage). O "?" indica propriedade opcional.
interface ImageCardProps {
    nome?: string;
    tamanho?: number;    // [AULA 15 - Passo 02] era string, agora é number (bytes)
    dataUpload?: string;
    src?: string;
    extension?: string;  // [AULA 15 - Passo 04] nova propriedade: formato da imagem
}

// [AULA 15 - Passos 02 e 05]
// - "tamanho = 0": valor padrão. Se o tamanho não vier, ele vale zero.
// - "extension" foi incluída na desestruturação para podermos usá-la no JSX.
export const ImageCard: React.FC<ImageCardProps> = ({ nome, dataUpload, src, tamanho = 0, extension }: ImageCardProps) => {

    // [AULA 14 - Passo 25] função de download.
    // window é um objeto global do navegador que representa a janela atual.
    // window.open(url, "_blank") abre a URL (o endereço da imagem) em uma NOVA aba;
    // como o back-end responde com o arquivo, o navegador oferece o download.
    // "noopener,noreferrer" é uma boa prática de segurança: a nova aba não
    // consegue acessar/controlar a página da galeria que a abriu.
    function download() {
        window.open(src, "_blank", "noopener,noreferrer");
    }

    return (
        // Obs.: corrigido "easy-in" -> "ease-in" (nome certo da classe do Tailwind)
        <div className="card relative bg-white rounded-md shadow-md transition-transform
        ease-in duration-300 transform hover:shadow-lg hover:-translate-y-2">

            {/* [AULA 14 - Passo 26] onClick (com C maiúsculo = evento do React).
                Passamos só o NOME da função (sem parênteses): quem a chama é o clique.
                O clique fica na <img> e não na <div>, para que selecionar o texto
                do card não dispare o download.
                cursor-pointer: mostra a "mãozinha" do mouse, indicando que é clicável.
                alt: texto alternativo (acessibilidade e caso a imagem não carregue). */}
            <img src={src}
                 onClick={download}
                 className="h-56 w-full object-cover rounded-t-md cursor-pointer"
                 alt={nome ?? "imagem"} />

            <div className="card-body p-4">
                <h5 className="text-lg font-semibold mb-2 text-gray-600">{nome}</h5>

                {/* [AULA 15 - Passo 05] formato da imagem, logo abaixo do nome */}
                <p className="text-gray-600">{extension}</p>

                {/* [AULA 15 - Passo 02] tamanho legível: chama formatBytes(bytes, casas decimais) */}
                <p className="text-gray-600">{formatBytes(tamanho, 2)}</p>

                {/* data já vem formatada dd/MM/yyyy pelo back-end (Aula 15 - Passo 03) */}
                <p className="text-gray-600">{dataUpload}</p>
            </div>
        </div>
    )
}

// =====================================================================
// [AULA 15 - Passo 01] formatBytes — função utilitária
// Converte um número de bytes em texto legível: "512 Bytes", "4.36 MB" etc.
// Fica neste arquivo porque só o ImageCard a usa.
// =====================================================================
function formatBytes(bytes: number, decimals: number = 2): string {
    // !+bytes é verdadeiro quando bytes é 0 (ou inválido): devolve "0 Bytes"
    if (!+bytes) return "0 Bytes";

    const k = 1024;                               // 1 KB = 1024 bytes
    const dm = decimals < 0 ? 0 : decimals;       // não aceita casas decimais negativas
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]; // unidades, em ordem crescente

    // Descobre a posição da unidade no array:
    // log(bytes) / log(1024) diz "quantas vezes cabe 1024" -> 0=Bytes, 1=KB, 2=MB...
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    // bytes / 1024^i converte para a unidade; toFixed(dm) arredonda;
    // parseFloat remove zeros desnecessários (ex: "2.50" -> 2.5).
    // A string template `${ } ${ }` junta o número com a unidade.
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
