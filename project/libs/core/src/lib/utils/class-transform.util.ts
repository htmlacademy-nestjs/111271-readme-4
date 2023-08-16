import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ClassTransformOptions } from 'class-transformer/types/interfaces';

export function fillObject<T, V>(
  someDto: ClassConstructor<T>,
  plainObject: V,
  opts?: ClassTransformOptions
): T {
  return plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
    ...opts,
  });
}
