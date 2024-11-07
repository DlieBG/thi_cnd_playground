import { Test } from '@nestjs/testing';
import { RecipeController } from './recipe.controller';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from 'src/entities/recipe.entity';

describe('RecipeController', () => {
  let recipeController: RecipeController;

  beforeAll(async () => {
    let mockRecipes = [];
    
    const moduleRef = await Test.createTestingModule({
        controllers: [RecipeController],
        providers: [
          {
            provide: RecipeService,
            useValue: {
              get_recipes: jest
                .fn()
                .mockImplementation(
                  () => {
                    return Promise.resolve(mockRecipes);
                  }
                ),
              get_recipe: jest
                .fn()
                .mockImplementation(
                  (id: string) => {
                    return Promise.resolve(mockRecipes.find(r => r.id === id));
                  }
                ),
              create_recipe: jest
                .fn()
                .mockImplementation(
                  (recipe: Recipe) => {
                    mockRecipes.push(recipe);
                    return Promise.resolve(recipe);
                  }
                ),
              update_recipe: jest
                .fn()
                .mockImplementation(
                  (id: string, recipe: Recipe) => {
                    let index = mockRecipes.findIndex(r => r.id === id);
                    mockRecipes[index] = recipe;
                    return Promise.resolve(recipe);
                  }
                ),
              delete_recipe: jest
                .fn()
                .mockImplementation(
                  (id: string) => {
                    let index = mockRecipes.findIndex(r => r.id === id);
                    mockRecipes.splice(index, 1);
                    return Promise.resolve({ affected: 1 });
                  }
                ),
            }
          }
        ],
      }).compile();

    recipeController = await moduleRef.get<RecipeController>(RecipeController);
  });

  let sampleRecipe1: Recipe = {
    id: '1',
    name: 'Sample Recipe 1',
    author: 'Sample Author 1',
    description: 'Sample Description 1',
    steps: [],
  };
  
  let sampleRecipe2: Recipe = {
    id: '2',
    name: 'Sample Recipe 2',
    author: 'Sample Author 2',
    description: 'Sample Description 2',
    steps: [],
  };
  
  describe('get recipes without existing recipes', () => {
    it('should return an empty array of recipes', async () => {
      await expect(
        recipeController.get_recipes()
      ).resolves.toEqual(
        []
      );
    });
  });
  
  describe('create recipes', () => {
    it('should create and return sampleRecipe1', async () => {
      await expect(
        recipeController.create_recipe(sampleRecipe1)
      ).resolves.toEqual(
        sampleRecipe1
      );
    });
    it('should create and return sampleRecipe2', async () => {
      await expect(
        recipeController.create_recipe(sampleRecipe2)
      ).resolves.toEqual(
        sampleRecipe2
      );
    });
  });

  describe('get recipes with existing recipes', () => {
    it('should return an filled array with sampleRecipe1', async () => {
      await expect(
        recipeController.get_recipes()
      ).resolves.toContain(
        sampleRecipe1
      );
    });
    it('should return an filled array with sampleRecipe2', async () => {
      await expect(
        recipeController.get_recipes()
      ).resolves.toContain(
        sampleRecipe2
      );
    });
  });

  describe('get recipe', () => {
    it('should return sampleRecipe1', async () => {
      await expect(
        recipeController.get_recipe('1')
      ).resolves.toEqual(
        sampleRecipe1
      );
    });
    it('should return an filled array with sampleRecipe2', async () => {
      await expect(
        recipeController.get_recipe('2')
      ).resolves.toEqual(
        sampleRecipe2
      );
    });
  });

  describe('update recipe', () => {
    it('should update sampleRecipe1', async () => {
      let updatedRecipe1: Recipe = {
        ...sampleRecipe1,
        name: 'Updated Sample Recipe 1',
      };

      await expect(
        recipeController.update_recipe('1', updatedRecipe1)
      ).resolves.toEqual(
        updatedRecipe1
      );
    });
  });

  describe('delete recipe', () => {
    it('should delete sampleRecipe2', async () => {
      recipeController.delete_recipe('2');

      await expect(
        recipeController.get_recipes()
      ).resolves.not.toContain(
        sampleRecipe2
      );
    });
  });
});
