// Interfaces
export interface prompt {
  title: string;
  prompt: string;
  type: string;
  requires: promptRequiresElement[];
  identifier: string;
  auto: boolean;
  description?: string;
  placeholder?: string;
  maxTokens: number;
  temperature: number;
}

export interface promptRequiresElement {
  reqVarName: string;
  ref: string;
}
