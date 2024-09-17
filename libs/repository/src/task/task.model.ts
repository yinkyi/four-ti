export interface CreateToDoInterface {
  title: string;
  content?: string;
  userId: string;
}

export interface UpdateToDoInterface extends Partial<CreateToDoInterface> {
  completed?: boolean;
}

export interface GetToDoInterface {
  title: string;
  completed: boolean;
  userId: string;
}
