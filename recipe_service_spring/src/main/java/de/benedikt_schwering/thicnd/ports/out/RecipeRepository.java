package de.benedikt_schwering.thicnd.ports.out;

import de.benedikt_schwering.thicnd.domain.model.Recipe;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository {
    public Optional<Recipe> getRecipe(String id);

    public List<Recipe> getRecipes();

    public void saveRecipe(Recipe recipe);

    public void deleteRecipe(String id);
}
