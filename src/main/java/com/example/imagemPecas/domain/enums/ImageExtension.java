package com.example.imagemPecas.domain.enums;

import lombok.Getter;
import org.springframework.http.MediaType;

import java.util.Arrays;

public enum ImageExtension {
    PNG(MediaType.IMAGE_PNG),
    JPEG(MediaType.IMAGE_JPEG),
    GIF(MediaType.IMAGE_GIF);

    @Getter
    private final MediaType mediaType;

    ImageExtension(MediaType mediaType) {
        this.mediaType = mediaType;
    }

    public static ImageExtension valueof(MediaType mediaType) {
        return Arrays.stream(values())
                .filter(ie -> ie.mediaType.equals(mediaType))
                .findFirst()
                .orElse(null);

    }

    // Converte um texto (ex.: "png", "JPEG") no valor do enum,
    // SEM lançar exceção quando o texto for null, vazio ou inválido.
    public static ImageExtension ofName(String name) {
        return Arrays.stream(values())          // transforma todos os valores do enum (PNG, JPEG, GIF) em uma stream
                .filter(ie -> ie.name().equalsIgnoreCase(name)) // mantém só o valor cujo nome bate com o texto,
                // ignorando maiúsculas/minúsculas ("png" = PNG);
                // se name for null, equalsIgnoreCase apenas retorna false
                .findFirst()                    // pega o primeiro valor encontrado
                .orElse(null);                  // se nenhum bater (null, "" ou "XPTO"), retorna null em vez de dar erro
    }


}

