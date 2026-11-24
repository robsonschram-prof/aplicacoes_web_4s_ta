package com.example.imagemPecas.application.images;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;

@Data
@Builder
public class ImageDTO {
    private String url;
    private String name;
    private String extension;
    private Long size;

    // [AULA 15 - Passo 03] @JsonFormat (biblioteca Jackson) define como a data
    // será escrita no JSON enviado ao front-end.
    //   dd   = dia com 2 dígitos
    //   MM   = mês com 2 dígitos (M MAIÚSCULO! "mm" minúsculo seria MINUTOS)
    //   yyyy = ano com 4 dígitos
    // Resultado: "30/10/2026" (formato brasileiro) em vez de "2026-10-30".
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate uploadDate;

}
