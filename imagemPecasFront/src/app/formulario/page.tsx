// =====================================================================
// formulario/page.tsx — página de cadastro de imagens
// Endereço: http://localhost:3000/formulario (o nome da PASTA vira o endereço)
// Por enquanto só tem o título; o formulário será construído nas próximas aulas.
// =====================================================================

// [AULA 15 - Passo 14] importa o Template pelo alias @/components
import { Template } from '@/components'

export default function FormularioPage() {
    return (
        // [AULA 15 - Passo 14] o conteúdo da página vira o "children" do Template.
        // Não passamos "loading": ele é opcional e vale false por padrão.
        <Template>
            {/* [AULA 15 - Passo 13] text-gray-500: dá cor ao texto (sem isso ele pode ficar branco) */}
            <h1 className="text-gray-500">Formulário de Cadastro de Imagens</h1>
        </Template>
    )
}
