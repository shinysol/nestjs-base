import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { makeCounterProvider, PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsService } from './services/metrics/metrics.service';

@Module({
  imports: [PrometheusModule.register({
    path: '/metrics',

  })],
  exports: [PrometheusModule],
  controllers: [AppController],
  providers: [AppService,
    makeCounterProvider({
      name: "http_requests_total",
      help: "total requests",
      labelNames: ['method', 'path', 'status_code']
    }),
    MetricsService,

  ],
})
export class AppModule { }
