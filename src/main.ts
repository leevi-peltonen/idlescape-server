import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {logger: ['error', 'warn', 'log'],});

    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    })

    const config = new DocumentBuilder()
        .setTitle('Idlescape API')
        .setDescription('Wohoo!')
        .setVersion('1.0')
        .addTag('nestjs')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);



    app.useWebSocketAdapter(new IoAdapter(app))
    await app.listen(3000);
}
bootstrap();
