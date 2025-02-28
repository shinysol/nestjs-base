import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MetricsInterceptor } from './interceptors/metrics.interceptor';
import { MetricsService } from './services/metrics/metrics.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new MetricsInterceptor(app.get(MetricsService)));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
