export interface ErrorableInput<T = string> {
  dirty: boolean;
  value: T;
  validation?: string;
}
