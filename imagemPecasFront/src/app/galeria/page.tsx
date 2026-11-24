// "use client": esta página roda no NAVEGADOR (precisa de useState e eventos de clique)
'use client'

import { Template, ImageCard } from '@/components'
import { Image } from '@/resources/image/image.resource'
import { useImageService } from '@/resources/image/image.service'
import { useState } from 'react'
// [AULA 15 - Passo 15] Link do Next.js para navegar entre páginas.
// É o "export default" de next/link, por isso vai SEM chaves { }.
import Link from 'next/link'

export default function GaleriaPage() {
    const useService = useImageService();

    // useState guarda valores que mudam e, ao mudar, fazem a tela se atualizar.
    // Formato: const [valor, funçãoQueAltera] = useState(valorInicial)
    const [images, setImages] = useState<Image[]>([]);          // lista de imagens da API
    const [query, setQuery] = useState<string>("");             // [AULA 14 - Passo 13] texto da pesquisa
    const [extension, setExtension] = useState<string>("");     // [AULA 14 - Passo 13] formato escolhido
    const [loading, setLoading] = useState<boolean>(false);     // [AULA 15 - Passo 08] está carregando?

    // Chamada ao clicar em Search
    async function searchImages() {
        setLoading(true); // [AULA 15 - Passo 08] início da busca: liga o spinner
        try {
            // [AULA 14 - Passo 16] envia o texto e o formato para a API
            const result = await useService.buscar(query, extension);
            setImages(result); // guarda o resultado -> a tela re-renderiza os cards
        } finally {
            // "finally" executa SEMPRE, mesmo se a API der erro (ex: back-end desligado).
            // Assim o spinner nunca fica girando para sempre.
            setLoading(false); // fim da busca: desliga o spinner
        }
    }

    // Monta UM card a partir de um objeto image
    function renderImageCard(image: Image) {
        return (
            <ImageCard key={image.url}              // key única: o React usa para identificar cada item da lista
                       nome={image.name}
                       src={image.url}
                       tamanho={image.size}
                       extension={image.extension}  // [AULA 15 - Passo 04] passa o formato para o card
                       dataUpload={image.uploadDate}
            />
        )
    }

    // Percorre a lista (map) e transforma cada imagem em um card
    function renderImageCards() {
        return images.map(renderImageCard);
    }

    return (
        // [AULA 15 - Passo 08] informa ao Template se está carregando
        <Template loading={loading}>

            {/* [AULA 14 - Passo 03] seção da barra de pesquisa
                flex: container flexível | flex-col: itens em coluna
                items-center / justify-center: centraliza | my-3: margem em cima e embaixo */}
            <section className="flex flex-col items-center justify-center my-3">

                {/* [AULA 14 - Passo 04] space-x-4: espaço horizontal entre os itens */}
                <div className="flex space-x-4">

                    {/* [AULA 14 - Passos 06 e 14] campo de texto da pesquisa
                        onChange: chamado a cada letra digitada;
                        event.target = o próprio input; .value = o texto dentro dele */}
                    <input type="text"
                           onChange={event => setQuery(event.target.value)}
                           className="border px-5 py-2 rounded-lg text-gray-900"
                           placeholder="Pesquisar por nome" />

                    {/* [AULA 14 - Passos 07, 19 e 20] select do formato
                        value = o que vai para o back-end | texto entre as tags = o que o usuário vê
                        value "" (vazio) = todos os formatos, sem filtro */}
                    <select onChange={event => setExtension(event.target.value)}
                            className="border px-4 py-2 rounded-lg text-gray-900">
                        <option value="">All Formats</option>
                        <option value="PNG">PNG</option>
                        <option value="JPEG">JPEG</option>
                        <option value="GIF">GIF</option>
                    </select>

                    {/* [AULA 14 - Passos 08 e 10] botão Search chama searchImages ao clicar
                        [AULA 15 - Passo 06] hover:bg-red-300 "acende" o botão com o mouse em cima
                        (número menor = cor mais clara) */}
                    <button className="bg-red-500 hover:bg-red-300 text-white px-4 py-2 rounded-lg"
                            onClick={searchImages}>
                        Search
                    </button>

                    {/* [AULA 14 - Passo 09] botão Add New (amarelo)
                        [AULA 15 - Passo 15] envolvido pelo Link: ao clicar, vai para /formulario
                        (o href é o nome da pasta da página) */}
                    <Link href="/formulario">
                        <button className="bg-yellow-500 hover:bg-yellow-300 text-white px-4 py-2 rounded-lg">
                            Add New
                        </button>
                    </Link>
                </div>
            </section>

            {/* grade de cards: 5 colunas com espaço entre eles */}
            <section className="grid grid-cols-5 gap-8">
                {renderImageCards()}
            </section>
        </Template>
    );
}
