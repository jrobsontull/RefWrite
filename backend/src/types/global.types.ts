// Interfaces
export interface prompt {
  title: string;
  prompt: string;
  type: string;
  requires: Array<Object>;
  identifier: string;
  auto: boolean;
  description?: string;
}
