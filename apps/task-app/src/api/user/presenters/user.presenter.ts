import { Expose } from 'class-transformer';

export class UserPresenter {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;
}
