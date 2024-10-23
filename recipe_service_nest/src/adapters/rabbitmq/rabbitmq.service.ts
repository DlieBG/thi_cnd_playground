import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitmqService {


    @RabbitSubscribe({
        exchange: 'recipe_service_exchange',
        routingKey: 'recipe.created',
        queue: 'recipe_service_queue'
    })
    public async pubSubHandler(msg) {
        console.log(`Received message: `);
        console.log(msg)
    }

}
