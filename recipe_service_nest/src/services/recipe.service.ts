import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { resolve } from "path";
import { QuantifiedIngredient } from "src/entities/quantified-ingredient.entity";
import { Recipe } from "src/entities/recipe.entity";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe)
        private recipeRepository: Repository<Recipe>,
    ) { }

    get_recipes(): Promise<Recipe[]> {
        return this.recipeRepository.find();
    }

    get_recipe(id: string): Promise<Recipe> {
        return this.recipeRepository.findOneBy({ id });
    }

    create_recipe(recipe: Recipe): Promise<Recipe> {
        return this.recipeRepository.save(recipe);
    }

    update_recipe(id: string, recipe: Recipe): Promise<Recipe> {
        return this.recipeRepository.save({ id, ...recipe });
    }

    delete_recipe(id: string): Promise<DeleteResult> {
        return this.recipeRepository.delete({ id });
    }

    get_total_ingredients(id: string): Promise<QuantifiedIngredient[]> {
        return new Promise(
            (resolve) => {
                this.recipeRepository.findOneBy({ id })
                    .then(
                        (recipe) => {
                            let total_ingredients = {};

                            recipe.steps.forEach(
                                (step) => {
                                    step.ingredients.forEach(
                                        (step) => {
                                            if (total_ingredients[step.ingredient])
                                                total_ingredients[step.ingredient] += step.quantity;
                                            else
                                                total_ingredients[step.ingredient] = step.quantity;
                                        }
                                    );
                                }
                            );

                            resolve(
                                Object.keys(total_ingredients).map(
                                    (key) => {
                                        return {
                                            ingredient: key,
                                            quantity: total_ingredients[key],
                                        } as QuantifiedIngredient;
                                    }
                                )
                            );
                        }
                    );
            }
        );
    }
}
