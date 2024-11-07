import { Test } from '@nestjs/testing';
import { RecipeService } from './recipe.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { createMock } from '@golevelup/ts-jest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Recipe } from '../entities/recipe.entity';

describe('RecipeService', () => {
  let recipeService: RecipeService;
  let amqpConnection: AmqpConnection;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        RecipeService,
        {
          provide: getRepositoryToken(Recipe),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOneBy: jest.fn().mockResolvedValue({
              steps: [
                {
                  ingredients: [
                    {
                      ingredient: 'ingredient1',
                      quantity: 1,
                    },
                    {
                      ingredient: 'ingredient2',
                      quantity: 2,
                    }
                  ]
                },
                {
                  ingredients: [
                    {
                      ingredient: 'ingredient1',
                      quantity: 12,
                    },
                    {
                      ingredient: 'ingredient2',
                      quantity: 200,
                    }
                  ]
                },
              ]
            }),
            save: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: AmqpConnection,
          useValue: createMock<AmqpConnection>(),
        }
      ]
    }).compile();

    recipeService = moduleRef.get<RecipeService>(RecipeService);
    amqpConnection = moduleRef.get<AmqpConnection>(AmqpConnection);
  });

  describe('message queue', () => {
    it('should publish a create message', async () => {
      let spy = jest.spyOn(amqpConnection, 'publish');

      await recipeService.create_recipe(new Recipe());

      expect(spy).toHaveBeenLastCalledWith('recipe_service_exchange', 'recipe.created', expect.any(Object));
    });
    it('should publish a update message', async () => {
      let updateSpy = jest.spyOn(amqpConnection, 'publish');

      await recipeService.update_recipe('', new Recipe());

      expect(updateSpy).toHaveBeenLastCalledWith('recipe_service_exchange', 'recipe.updated', expect.any(Object));
    });
    it('should publish a delete message', async () => {
      let updateSpy = jest.spyOn(amqpConnection, 'publish');

      await recipeService.delete_recipe('');

      expect(updateSpy).toHaveBeenLastCalledWith('recipe_service_exchange', 'recipe.deleted', expect.any(Object));
    });
  });

  describe('get total ingredients', () => {
    it('should return all ingredients', async () => {
      expect(recipeService.get_total_ingredients('')).resolves.toEqual([
        { ingredient: 'ingredient1', quantity: 13 },
        { ingredient: 'ingredient2', quantity: 202 },
      ]);
    });
  });
});
