import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
class TypePipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    return plainToClass(metatype, value);
  }
}
export default TypePipe;
