export const AuthModes = {
  LOGIN: 'login',
  REGISTER: 'register',
} as const;
export type AuthMode = (typeof AuthModes)[keyof typeof AuthModes];
