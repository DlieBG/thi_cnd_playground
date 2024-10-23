import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))

channel = connection.channel()
channel.queue_declare(queue='python_test_queue', durable=True, )
channel.queue_bind(
    exchange='recipe_service_exchange',
    queue='python_test_queue',
    routing_key='recipe.*'
)

channel.basic_consume(
    queue='python_test_queue',
    on_message_callback=lambda ch, method, properties, body: print(body.decode()),
    auto_ack=True,
)
channel.start_consuming()
