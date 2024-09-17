import { UserPresenter } from '../../user/presenters/user.presenter';
import { Expose } from 'class-transformer';

export class TaskPresenter {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  completed: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  user: UserPresenter;
}
