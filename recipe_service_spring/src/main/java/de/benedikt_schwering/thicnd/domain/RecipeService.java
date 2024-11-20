package de.benedikt_schwering.thicnd.domain;

import de.benedikt_schwering.thicnd.domain.model.QuantifiedIngredient;
import de.benedikt_schwering.thicnd.domain.model.Recipe;
import de.benedikt_schwering.thicnd.domain.model.Step;

import java.util.List;
import java.util.Optional;

public interface RecipeService {
    public List<Recipe> getRecipes();

    public Optional<Recipe> getRecipe(String id);

    public Recipe addRecipe(String name, String description, List<Step> steps);

    public Optional<Recipe> updateRecipe(String id, String name, String description, List<Step> steps);

    public void deleteRecipe(String id);

    public List<QuantifiedIngredient> getTotalIngredients(String id);
}
