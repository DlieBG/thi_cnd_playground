import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { RecipeService } from './services/recipe.service';
import { RecipeController } from './controllers/recipe.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'recipe',
      entities: [Recipe],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Recipe]),
  ],
  controllers: [
    RecipeController,
  ],
  providers: [
    RecipeService,
  ],
})
export class AppModule {}
