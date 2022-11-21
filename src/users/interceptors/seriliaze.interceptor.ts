import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';
interface ClassConstructor {
  new (...args: any[]): {};
}
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //run before a request is handled
    // console.log('run before a request is handled', context);
    return next.handle().pipe(
      map((data: any) => {
        //run before the response is sent out
        // console.log('run before a response is sent out', data);
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true, //only expose value will be shown
        });
      }),
    );
  }
}
