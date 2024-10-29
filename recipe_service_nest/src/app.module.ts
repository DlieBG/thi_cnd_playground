import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { RecipeService } from './services/recipe.service';
import { RecipeController } from './controllers/recipe.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitmqService } from './adapters/rabbitmq/rabbitmq.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DATABASE || 'recipe',
      entities: [Recipe],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Recipe]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'recipe_service_exchange',
          type: 'topic',
        }
      ],
      uri: process.env.RABBITMQ_URI || 'amqp://localhost:5672',
    }),
  ],
  controllers: [
    RecipeController,
  ],
  providers: [
    RecipeService,
    RabbitmqService,
  ],
})
export class AppModule {}
