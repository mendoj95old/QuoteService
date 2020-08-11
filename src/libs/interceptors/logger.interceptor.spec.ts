import { LoggerInterceptor } from './logger.interceptor';
import { Logger, ExecutionContext, CallHandler } from '@nestjs/common';
// import executionContext from './__mocks__/executionContext';

const req = {
  url: 'url',
  method: 'TEST',
  params: 'params',
  query: 'query',
  route: 'route',
};

const res = {
  url: 'url',
  req,
};

const executionContext = {
  switchToHttp: jest.fn().mockReturnThis(),
  getRequest: jest.fn().mockReturnValue(req),
  getResponse: jest.fn().mockReturnThis(),
};

describe.skip('LoggerInterceptor', () => {
  let loggerInterceptor: LoggerInterceptor;
  let callHandler: CallHandler;
  let ctx: ExecutionContext;

  beforeEach(async () => {
    const logger = new Logger();
    loggerInterceptor = new LoggerInterceptor(logger);
    (executionContext.switchToHttp().getRequest as jest.Mock<any, any>).mockReturnValue({req});
    loggerInterceptor.intercept(ctx, callHandler);
  });

  it('should be defined', () => {
    expect(loggerInterceptor).toBeDefined();
  });

});
