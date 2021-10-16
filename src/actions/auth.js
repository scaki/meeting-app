import { SIGN_IN } from '../constants/auth';

export function signIn(values, success = () => {}, error = () => {}) {
  return {
    type: SIGN_IN,
    values,
    success,
    error,
  };
}
