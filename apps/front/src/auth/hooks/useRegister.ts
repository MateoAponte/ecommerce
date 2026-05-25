import { useState } from 'react';

import type { RegisterFormValues } from '../schemas/login.schema';
import { authService } from '../service/auth.service';
import { Encoder } from '../../common/helpers/encoder';

export const useRegister = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const register = async (values: RegisterFormValues) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      let { email, password: rPass, name } = values;
      rPass = Encoder.encode(values.password);

      await authService.register({
        email,
        name,
        password: rPass,
      });
    } catch (error: any) {
      const { message } = error.response.data;
      const capitalizedMessage = message.charAt(0).toUpperCase() + message.slice(1);

      setSubmitError(
        error instanceof Error
          ? capitalizedMessage
          : 'Unable to create the user in right now.',
      );
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    isSubmitting,
    submitError,
  };
};
