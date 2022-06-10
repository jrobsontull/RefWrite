// Interfaces
export interface prompt {
  title: string;
  prompt: string;
  type: string;
  requires: Array<Object>;
  identifier: string;
  auto: boolean;
  description?: string;
  placeholder?: string;
}

export interface promptData {
  model?: string;
  maxTokens: number;
  temperature?: number;
  prompt: string;
}
