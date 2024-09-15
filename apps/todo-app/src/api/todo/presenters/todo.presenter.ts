import { UserPresenter } from './user.presenter';
import { Expose } from 'class-transformer';

export class TodoPresenter {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  user: UserPresenter;
}
