package com.example.imagemPecas.domain.entity;

import com.example.imagemPecas.domain.enums.ImageExtension;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime;

@Entity
@Table
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column
    private String name;
    @Column
    private Long size;
    @Column
    @Enumerated(EnumType.STRING)
    private ImageExtension extension;
    @Column
    @CreatedDate
    private LocalDateTime uploadDate;
    @Column
    private String tags;
    @Column
    @Lob
    private byte[] file;


    // [AULA 14 - Passo 28] nome do arquivo sugerido pelo navegador no download.
    // Junta: nome + "." + extensão em minúsculas -> ex: "placa mãe.jpeg"
    // (antes saía "placa mãe.JPEG"; o toLowerCase() deixa no padrão usual de arquivos)
    // Esse nome é usado no cabeçalho Content-Disposition do ImagesController.
    public String getFileName(){
        return getName().concat(".").concat(getExtension().name().toLowerCase());
    }
}
