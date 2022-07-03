import { ObjectId } from 'mongodb';

// Interfaces
export interface prompt {
  title: string;
  prompt: string;
  type: string;
  identifier: string;
  auto: boolean;
  description?: string;
  placeholder?: string;
  maxTokens: number;
  temperature: number;
  model: string;
}

export interface generalOpts {
  firstName: string;
  job: string;
  relationship: string;
  organisation: string;
}

export interface User {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  permission: string;
}

export interface AuthCookie {
  auth: string | null;
}
