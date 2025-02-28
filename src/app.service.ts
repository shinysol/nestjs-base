import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@Injectable()
export class AppService {
  constructor(@InjectMetric("metric_name") public counter: Counter<string>) {

  }
  getHello(): string {
    return 'Hello World!';
  }
}
