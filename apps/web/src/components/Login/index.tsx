'use client';
import { Container, Stack, Heading, Center } from '@chakra-ui/react';
import InnerForm from './components/InnerForm';
import { withFormik } from 'formik';
import { FormProps, FormValues } from './types';
import * as Yup from 'yup';
import { useAppDispatch } from '@/lib/hooks';
import { signIn } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';

const LoginSchema = Yup.object().shape({
  userEmail: Yup.string()
    .email('Invalid email address format')
    .required('Email is required'),
  userPassword: Yup.string().required('Password is required'),
});

const LoginView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const LoginForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      userEmail: props.initialUserEmail || '',
      userPassword: props.initialUserPassword || '',
    }),
    validationSchema: LoginSchema,
    enableReinitialize: true,
    handleSubmit({ userEmail, userPassword }: FormValues, { resetForm }) {
      dispatch(signIn({ userEmail, userPassword }));
      resetForm();
      router.push('/');
    },
  })(InnerForm);

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">Sign in to your account</Heading>
          </Stack>
          <LoginForm />
        </Stack>
      </Center>
    </Container>
  );
};

export default LoginView;
