import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@Injectable()
export class MetricsService {
    constructor(@InjectMetric("http_requests_total") public counter: Counter<string>) {
    }
    incrementHttpRequests(method: string, status: number, path: string) {
        this.counter.inc({ method, status_code: status.toString(), path });
    }
}
