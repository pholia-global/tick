export interface ActionType<T> {
  type: string;
  payload: T | T[];
  index?: number;
}

export interface StateType<T> {
  dataList: T[];
}
