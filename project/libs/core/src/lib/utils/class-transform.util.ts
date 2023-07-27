import { ClassConstructor, plainToInstance } from 'class-transformer';

export function fillObject<T, V>(
  someDto: ClassConstructor<T>,
  plainObject: V
): T {
  return plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
  });
}
