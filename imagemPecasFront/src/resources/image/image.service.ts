// =====================================================================
// image.service.ts — classe que conversa com a API (back-end Java)
// =====================================================================
import { Image } from '@/resources/image/image.resource'

class ImageService {
    // URL base do endpoint de imagens do back-end (Spring Boot na porta 8080)
    baseURL: string = 'http://localhost:8080/v1/images';

    // [AULA 14 - Passo 16] o método buscar agora recebe dois parâmetros:
    //   query     -> texto digitado na pesquisa (trecho do nome da imagem)
    //   extension -> formato escolhido no select ("PNG", "JPEG", "GIF" ou "" = todos)
    // O '= ""' é o VALOR PADRÃO: se quem chamar não informar nada, vale string vazia.
    // Isso torna os dois parâmetros opcionais para o TypeScript.
    async buscar(query: string = "", extension: string = ""): Promise<Image[]> {

        // [AULA 14 - Passo 17] montagem da URL com STRING TEMPLATE (crases ` `).
        // Dentro das crases, ${ } insere o valor de uma variável.
        // Resultado, por exemplo: http://localhost:8080/v1/images?query=placa&extension=JPEG
        //
        // encodeURIComponent(...) "protege" o texto digitado: troca espaços,
        // acentos e símbolos como & ou # por códigos seguros na URL (ex: espaço -> %20).
        // Sem isso, se o usuário digitar "a&b", o & seria confundido com o separador
        // de parâmetros e a pesquisa quebraria.
        //
        // ATENÇÃO: os nomes "query" e "extension" precisam ser IGUAIS aos do
        // @RequestParam no ImagesController.java, senão o back-end não filtra.
        const url = `${this.baseURL}?query=${encodeURIComponent(query)}&extension=${encodeURIComponent(extension)}`;

        // fetch faz a requisição HTTP GET para a URL montada
        const response = await fetch(url);

        // .json() converte o corpo da resposta (texto JSON) em objetos JavaScript
        return await response.json();
    }
}

// Função que cria (e devolve) um objeto ImageService, usada nas páginas
export const useImageService = () => new ImageService();
