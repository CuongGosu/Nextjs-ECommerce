'use client';

import { useEffect, useState } from 'react';
import Input from '../components/inputs/Input';
import Heading from '../components/products/Heading';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Button from '../components/products/Button';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SafeUser } from '@/types';

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const router = useRouter();
  useEffect(() => {
    if (currentUser) {
      router.push('/cart');
      router.refresh;
    }
  }, []);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Registered successfully');
        signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push('/cart');
            router.refresh();
            toast.success('Logged in successfully');
          }
          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <>
      <Heading title='Sign up for E-Shop' />
      <Button
        outline
        label='Sign up with Google'
        icon={AiOutlineGoogle}
        onCLick={() => {
          signIn('google');
        }}
      />
      <hr className='bg-slate-300 w-full h-px' />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type='password'
      />
      <Button
        label={isLoading ? 'Loading' : 'Sign Up'}
        onCLick={handleSubmit(onSubmit)}
      />
      <p className='text-sm'>
        Already have an account{' '}
        <Link className='underline' href='/login'>
          Log in
        </Link>
      </p>
    </>
  );
};
export default RegisterForm;
