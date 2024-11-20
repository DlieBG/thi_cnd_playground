package de.benedikt_schwering.thicnd.adapters.in.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateRecipeRequest {
    private String name;
    private String description;
}
