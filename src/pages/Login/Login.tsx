import { Logo } from '@/assets/svg';
import { NOT_FOUND_ERROR_CODE, SERVER_ERROR } from '@/pages/Login/constants';
import { NOT_FOUND_ERROR } from '@/pages/Login/constants';
import { usePostLogin } from '@/pages/Login/hooks/queries';
import { type LoginForm, loginSchema } from '@/pages/Login/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@sopt-makers/ui';
import { useState } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';

const Login = () => {
  const [error, setError] = useState('');

  const method = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = method;

  const { mutate: postLogin } = usePostLogin();

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    setError('');
    postLogin(
      { email: data.email, password: data.password },
      {
        onError: (error: Error) => {
          if (error.message.includes(NOT_FOUND_ERROR_CODE)) {
            setError(NOT_FOUND_ERROR);
          } else {
            setError(SERVER_ERROR);
          }
        },
      },
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-[1.2rem]">
      <div className="flex flex-col items-center justify-center gap-[1.2rem]">
        <Logo width={172} />
        <h1 className="heading_5_20_b text-gray10">Recruit Admin</h1>
      </div>
      <FormProvider {...method}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[1.6rem] w-[40rem]"
        >
          <TextField
            labelText="이메일"
            placeholder="이메일 주소를 입력해주세요."
            isError={!!errors.email || !!error}
            errorMessage={errors.email?.message || error}
            {...register('email')}
          />
          <TextField
            type="password"
            labelText="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            isError={!!errors.password || !!error}
            errorMessage={errors.password?.message || error}
            {...register('password')}
          />
          <Button type="submit" className="mt-[3.2rem]">
            로그인
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
export default Login;
