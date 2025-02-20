import { CallHandler, NestInterceptor, ExecutionContext, UseInterceptors } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { plainToInstance } from "class-transformer";


interface SerializeType {
    new (...args: any[]): Object
}


export const SerializeFunction = (dto: SerializeType) => {
    return UseInterceptors(new SerializeInterceptor(dto));
}


export class SerializeInterceptor implements NestInterceptor {
 constructor(private dto: any) {}
 
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: any) => {
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true,
                });
        }));
    }
}