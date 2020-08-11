import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {

  constructor(
    private readonly logger: Logger,
  ) {
    logger.setContext(LoggerInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logRequest(context);
    const requestTimeReceived = Date.now();

    return next
      .handle()
      .pipe(tap(() => this.logResponse(context, requestTimeReceived)));
  }

  private logResponse(context: ExecutionContext, requestTimeReceived: number) {
    const { statusCode, req } = context.switchToHttp().getResponse();
    this.logger.log(`Response - method=${req.method} uri=${req.route.path} url=${req.url} elaspseTime=${this.calculateElaspseTime(requestTimeReceived)}ms statusCode=${statusCode}`);
  }

  private logRequest(context: ExecutionContext) {
    const { url, method, params, query, route } = context.switchToHttp().getRequest();
    this.logger.log(`Request - method=${method} uri=${route.path} url=${url} params=${JSON.stringify(params)} query=${JSON.stringify(query)}`);
  }

  private calculateElaspseTime(requestTimeReceived: number) {
    return Date.now() - requestTimeReceived;
  }
}
