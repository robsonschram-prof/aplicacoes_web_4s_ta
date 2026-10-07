package com.example.imagemPecas.infra.repository;

import com.example.imagemPecas.domain.entity.Image;
import com.example.imagemPecas.domain.enums.ImageExtension;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.util.StringUtils;

import java.util.List;

// "import static": permite chamar os métodos estáticos direto pelo nome,
// sem prefixar com a classe (ex.: conjunction() em vez de GenericSpecs.conjunction()).
import static com.example.imagemPecas.infra.repository.specs.GenericSpecs.conjunction;
import static com.example.imagemPecas.infra.repository.specs.ImageSpecs.*; // extensionEqual, nameLike, tagsLike
import static org.springframework.data.jpa.domain.Specification.anyOf;
import static org.springframework.data.jpa.domain.Specification.where;

// JpaRepository: métodos prontos (save, findById, findAll...).
// JpaSpecificationExecutor: permite pesquisar usando Specification (filtros dinâmicos).
public interface ImageRepository extends JpaRepository<Image, String>,
        JpaSpecificationExecutor<Image> {

    /**
     * SQL que queremos gerar:
     * SELECT * FROM IMAGE WHERE 1 = 1
     *   AND EXTENSION = 'PNG'                          (só se extension foi informada)
     *   AND (NAME LIKE '%QUERY%' OR TAGS LIKE '%QUERY%') (só se query foi informada)
     */
    default List<Image> findByExtensionAndNameOrTagsLike(ImageExtension extension, String query) {

        // WHERE 1 = 1 → condição-base, sempre verdadeira (PASSO 24 – GenericSpecs)
        Specification<Image> spec = where(conjunction());

        // AND EXTENSION = 'PNG' → só entra se a extensão foi informada (PASSO 21)
        if (extension != null) {
            spec = spec.and(extensionEqual(extension)); // Specification é imutável: sempre reatribuir!
        }

        // AND (NAME LIKE ... OR TAGS LIKE ...) → só entra se a query tem texto (PASSO 22)
        if (StringUtils.hasText(query)) {
            spec = spec.and(anyOf(nameLike(query), tagsLike(query))); // anyOf = OR
        }

        return findAll(spec); // executa a consulta montada
    }
}