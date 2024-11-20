package de.benedikt_schwering.thicnd.domain.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Setter;

import java.util.UUID;

@Data
@AllArgsConstructor
public class QuantifiedIngredient {
    @Setter(AccessLevel.NONE)
    private String id;
    private String ingredient;
    private double quantity;

    public QuantifiedIngredient() {
        this.id = UUID.randomUUID().toString();
    }
}
