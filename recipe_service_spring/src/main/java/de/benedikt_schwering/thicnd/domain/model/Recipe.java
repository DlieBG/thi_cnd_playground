package de.benedikt_schwering.thicnd.domain.model;

import lombok.*;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
public class Recipe {
    @Setter(AccessLevel.NONE)
    private String id;
    private String name;
    private String description;
    private List<Step> steps;

    public Recipe() {
        this.id = UUID.randomUUID().toString();
    }

}
