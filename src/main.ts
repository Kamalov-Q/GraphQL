import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = 3001;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT ?? 3000, () => {
    console.log(`Application running on http://localhost:${PORT}`);
  });
}
bootstrap();
