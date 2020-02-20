import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {

  private readonly logger = new Logger(LoggerInterceptor.name, true);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    // console.log(request);
    const { url, method, params, query, headers, statusCode } = request;

    this.logger.log(`Request - method=${method} uri=${JSON.stringify(headers)} url=${url} params=${JSON.stringify(params)} query=${JSON.stringify(query)}`);
    const now = Date.now();

    return next
      .handle()
      .pipe(tap(() => this.logger
      .log(`Response - method=${method} url=${url} elaspseTime=${Date.now() - now}ms statusCode=${statusCode}`)));
  }
}
