import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { registerSchema, type RegisterFormValues } from '../schemas/login.schema';
import { Spinner } from '../../common/ui/Spinner/Spinner';
import { Button, TextField } from '@mui/material';
import { TextFieldStyle } from '../../common/constants/TextFieldStyle';
import { useRegister } from '../hooks/useRegister';
import { AuthModes, type AuthMode } from '../types/AuthMode';
import toast from 'react-hot-toast';

export const Register = ({ setMode }: { setMode: (mode: AuthMode) => void }) => {
  const { register: registerAuth, isSubmitting, submitError } = useRegister();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: RegisterFormValues) => {
    await registerAuth(values).then(() => {
      reset();
      setMode(AuthModes.LOGIN);
      toast.success('User created successfully');
    });
  };

  return (
    <form
      className="d-flex flex-column justify-content-between h-100"
      onSubmit={(e) => {
        e.preventDefault(); // Prevent form submission
        handleSubmit(onSubmit)(e);
      }}
      noValidate
    >
      <div>
        <div className="mb-2 pt-1">
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

        <div className="mb-2">
          <TextField
            fullWidth
            id="name"
            label="Name"
            variant="outlined"
            autoComplete="current-name"
            {...register('name')}
            placeholder="Your address name"
            error={Boolean(errors.name)}
            aria-invalid={Boolean(errors.name)}
            helperText={errors.name?.message || 'Enter your name'}
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

      <Button
        disabled={isSubmitting || !isValid}
        variant="outlined"
        fullWidth
        type="submit"
      >
        {isSubmitting ? <Spinner size="md" /> : <span>Sign up</span>}
      </Button>
    </form>
  );
};
