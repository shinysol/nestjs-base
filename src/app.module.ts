import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { makeCounterProvider, PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [PrometheusModule.register()],
  controllers: [AppController],
  providers: [AppService,
    makeCounterProvider({
      name: "metric_name",
      help: "metric_help",
    }),

  ],
})
export class AppModule {}
