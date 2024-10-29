import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QuantifiedIngredient } from "src/entities/quantified-ingredient.entity";
import { Recipe } from "src/entities/recipe.entity";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe)
        private recipeRepository: Repository<Recipe>,
        private readonly amqpConnection: AmqpConnection,
    ) { }

    get_recipes(): Promise<Recipe[]> {
        return this.recipeRepository.find();
    }

    get_recipe(id: string): Promise<Recipe> {
        return this.recipeRepository.findOneBy({ id });
    }

    create_recipe(recipe: Recipe): Promise<Recipe> {
        let created = this.recipeRepository.save(recipe);
        created.then(
            r => this.amqpConnection.publish('recipe_service_exchange', 'recipe.created', r)
        );

        return created;
    }

    update_recipe(id: string, recipe: Recipe): Promise<Recipe> {
        let updated = this.recipeRepository.save({ id, ...recipe });
        updated.then(
            u => this.amqpConnection.publish('recipe_service_exchange', 'recipe.updated', u)
        );

        return updated;
    }

    delete_recipe(id: string): Promise<DeleteResult> {
        let deleted = this.recipeRepository.delete({ id });
        deleted.then(
            d => this.amqpConnection.publish('recipe_service_exchange', 'recipe.deleted', {id, ...d})
        );

        return deleted;
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
