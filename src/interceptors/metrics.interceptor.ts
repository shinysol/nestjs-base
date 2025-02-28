import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { MetricsService } from "src/services/metrics/metrics.service";

export class MetricsInterceptor implements NestInterceptor {
    constructor(private readonly metricsService: MetricsService) {

    }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const { method, path } = req;

        return next.handle().pipe(
            tap({
                next: () => {
                    const res = context.switchToHttp().getResponse();
                    this.metricsService.incrementHttpRequests(method, res.statusCode, path);
                },
                error: () => {
                    this.metricsService.incrementHttpRequests(method, 500, path);
                },
            }),
        );
    }
}