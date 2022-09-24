import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const start = performance.now();
    return next.handle().pipe(
      map((data) => {
        if (!data) data = {};
        data['server_load_time'] = (performance.now() - start)
          .toFixed(4)
          .toString();
        return data;
      }),
    );
  }
}
