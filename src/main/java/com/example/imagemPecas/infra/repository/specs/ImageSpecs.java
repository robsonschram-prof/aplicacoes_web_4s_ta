package com.example.imagemPecas.infra.repository.specs;

import com.example.imagemPecas.domain.entity.Image;
import com.example.imagemPecas.domain.enums.ImageExtension;
import org.springframework.data.jpa.domain.Specification;


public class ImageSpecs {


    private ImageSpecs() {}


    public static Specification<Image> extensionEqual(ImageExtension extension) {
        return (root, q, cb) ->
                cb.equal(root.get("extension"), extension); // campo Java "extension" = valor recebido
    }

        public static Specification<Image> nameLike(String name) {
        return (root, q, cb) ->
                cb.like(cb.upper(root.get("name")),        // nome do banco em CAIXA ALTA
                        "%" + name.toUpperCase() + "%");   // texto pesquisado em CAIXA ALTA, com coringas %
    }

       public static Specification<Image> tagsLike(String tags) {
        return (root, q, cb) ->
                cb.like(cb.upper(root.get("tags")),
                        "%" + tags.toUpperCase() + "%");
    }
}