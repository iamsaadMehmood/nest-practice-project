import { Expose, Transform } from 'class-transformer';

export class UserDto {
  @Transform(({ obj }) => obj._id)
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  username: string;
  @Expose()
  phoneNumber: string;
}
