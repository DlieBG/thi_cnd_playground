package de.benedikt_schwering.thicnd.domain.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
public class Step {
    @Setter(AccessLevel.NONE)
    private String id;
    private List<QuantifiedIngredient> quantifiedIngredients;
    private String description;

    public Step() {
        this.id = UUID.randomUUID().toString();
    }
}
