package de.benedikt_schwering.thicnd.adapters.in.rest;

import de.benedikt_schwering.thicnd.adapters.in.rest.dto.CreateRecipeRequest;
import de.benedikt_schwering.thicnd.adapters.in.rest.dto.RecipeResponse;
import de.benedikt_schwering.thicnd.adapters.in.rest.dto.UpdateRecipeRequest;
import de.benedikt_schwering.thicnd.domain.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping()
    public List<RecipeResponse> getRecipes() {
        return recipeService.getRecipes().stream().map(RecipeResponse::fromRecipe).toList();
    }

    @GetMapping("/{id}")
    public RecipeResponse getRecipe(@PathVariable String id) {
        var recipe = recipeService.getRecipe(id);

        if (recipe.isPresent())
            return RecipeResponse.fromRecipe(recipe.get());

        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Recipe not found");
    }

    @PostMapping()
    public RecipeResponse createRecipe(@RequestBody CreateRecipeRequest createRecipeRequest) {
        return RecipeResponse.fromRecipe(
                recipeService.addRecipe(
                        createRecipeRequest.getName(),
                        createRecipeRequest.getDescription(),
                        List.of()
                )
        );
    }

    @PutMapping("/{id}")
    public RecipeResponse updateRecipe(@PathVariable String id, @RequestBody UpdateRecipeRequest updateRecipeRequest) {
        var recipe = recipeService.updateRecipe(
                id,
                updateRecipeRequest.getName(),
                updateRecipeRequest.getDescription(),
                List.of()
        );

        if (recipe.isPresent())
            return RecipeResponse.fromRecipe(recipe.get());

        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Recipe not found");
    }

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable String id) {
        recipeService.deleteRecipe(id);
    }
}
