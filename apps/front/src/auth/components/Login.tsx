import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { loginSchema, type LoginFormValues } from '../schemas/login.schema';
import { useLogin } from '../hooks/useLogin';
import { Spinner } from '../../common/ui/Spinner/Spinner';
import { Button, TextField, Typography } from '@mui/material';
import { TextFieldStyle } from '../../common/constants/TextFieldStyle';
import { ROUTES } from '../../router/routePaths';
import { Link } from 'react-router';

export const Login = () => {
  const { login, isSubmitting, submitError } = useLogin();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: LoginFormValues) => {
    await login(values).then(() => {
      reset();
    });
  };

  return (
    <form
      className="d-flex flex-column justify-content-between h-100"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)(e);
      }}
      noValidate
    >
      <div>
        <div className="mb-4 pt-1">
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            {...register('email')}
            placeholder="you@example.com"
            error={Boolean(errors.email)}
            aria-invalid={Boolean(errors.email)}
            helperText={errors.email?.message || 'Enter your email'}
            sx={TextFieldStyle}
          />
        </div>

        <div className="mb-4">
          <TextField
            fullWidth
            id="password"
            label="Password"
            variant="outlined"
            autoComplete="current-password"
            {...register('password')}
            placeholder="••••••••"
            error={Boolean(errors.password)}
            aria-invalid={Boolean(errors.password)}
            helperText={errors.password?.message || 'Enter your password'}
            sx={TextFieldStyle}
          />
        </div>

        {submitError && (
          <p className="text-danger" style={{ fontSize: '0.8rem', lineHeight: '1rem' }}>
            * {submitError}
          </p>
        )}
      </div>

      <div>
        <Button
          disabled={isSubmitting || !isValid}
          variant="outlined"
          fullWidth
          type="submit"
        >
          {isSubmitting ? <Spinner size="md" /> : <span>Sign in</span>}
        </Button>
        <Typography
          sx={{ mt: 2, color: 'var(--accent)', textAlign: 'center', fontSize: 12 }}
        >
          Or continue to <Link to={ROUTES.ecommerce}>E-commerce</Link>
        </Typography>
      </div>
    </form>
  );
};
