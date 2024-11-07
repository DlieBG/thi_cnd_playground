import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QuantifiedIngredient } from "../entities/quantified-ingredient.entity";
import { Recipe } from "../entities/recipe.entity";
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

    async create_recipe(recipe: Recipe): Promise<Recipe> {
        let created = await this.recipeRepository.save(recipe);
        this.amqpConnection.publish('recipe_service_exchange', 'recipe.created', created);

        return created;
    }

    async update_recipe(id: string, recipe: Recipe): Promise<Recipe> {
        let updated = await this.recipeRepository.save({ id, ...recipe });
        this.amqpConnection.publish('recipe_service_exchange', 'recipe.updated', updated);

        return updated;
    }

    async delete_recipe(id: string): Promise<DeleteResult> {
        let deleted = await this.recipeRepository.delete({ id });
        this.amqpConnection.publish('recipe_service_exchange', 'recipe.deleted', {id, ...deleted});

        return deleted;
    }

    async get_total_ingredients(id: string): Promise<QuantifiedIngredient[]> {
        let recipe = await this.recipeRepository.findOneBy({ id });

        if (recipe) {
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

            return Object.keys(total_ingredients).map(
                (key) => {
                    return {
                        ingredient: key,
                        quantity: total_ingredients[key],
                    } as QuantifiedIngredient;
                }
            );
        }

        return [];
    }
}
