import { ObjectId } from 'mongodb';

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
  model: string;
}

export interface promptRequiresElement {
  reqVarName: string;
  ref: string;
}

export interface generalOpts {
  firstName: string;
  job: string;
  relationship: string;
  organisation: string;
}

export interface User {
  _id: ObjectId;
  permission: string;
  auth: string | null;
}
