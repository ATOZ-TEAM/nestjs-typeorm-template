import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { appEnv } from './environments';

export function useSwagger(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth({ in: 'header', type: 'http' })
    .setTitle(`Peopet api [${appEnv}]`)
    .setVersion('1.0.0')
    .setDescription(``)
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);
}
