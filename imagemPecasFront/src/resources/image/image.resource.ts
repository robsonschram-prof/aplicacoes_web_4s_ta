// =====================================================================
// image.resource.ts — "molde" (modelo) de uma imagem vinda da API
// ---------------------------------------------------------------------
// Esta classe descreve QUAIS campos o back-end devolve para cada imagem
// (o JSON do ImageDTO do Java). O "?" indica que o campo é opcional.
// =====================================================================
export class Image {
    url?: string;        // endereço para ver/baixar a imagem (ex: http://localhost:8080/v1/images/abc123)
    name?: string;       // nome da imagem cadastrado pelo usuário
    extension?: string;  // formato: "PNG", "JPEG" ou "GIF"

    // [AULA 15 - Passo 04] size voltou a ser "number".
    // Motivo: a API devolve o tamanho como número (Long no Java) e a função
    // formatBytes do ImageCard faz contas com ele (divisão, logaritmo).
    size?: number;

    uploadDate?: string; // data de upload; já chega formatada "dd/MM/yyyy" pelo back-end (Aula 15 - Passo 03)
}
