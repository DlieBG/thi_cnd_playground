import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Recipe } from "src/entities/recipe.entity";
import { RecipeService } from "src/services/recipe.service";

@Controller()
export class RecipeController {
    constructor(
        private readonly recipeService: RecipeService,
    ) { }

    @Get()
    get_recipes() {
        return this.recipeService.get_recipes();
    }

    @Get(":id")
    get_recipe(@Param('id') id: string) {
        return this.recipeService.get_recipe(id);
    }

    @Post()
    create_recipe(@Body() recipe: Recipe) {
        return this.recipeService.create_recipe(recipe);
    }

    @Put(":id")
    update_recipe(@Param('id') id: string, @Body() recipe: Recipe) {
        return this.recipeService.update_recipe(id, recipe);
    }

    @Delete(":id")
    delete_recipe(@Param('id') id: string) {
        return this.recipeService.delete_recipe(id);
    }
    
    @Get(":id/total-ingredients")
    get_total_ingredients(@Param('id') id: string) {
        return this.recipeService.get_total_ingredients(id);
    }
}
