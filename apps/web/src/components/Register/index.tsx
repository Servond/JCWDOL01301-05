'use client';
import { Container, Stack, Heading, Center } from '@chakra-ui/react';
import { withFormik } from 'formik';
import { useRouter } from 'next/navigation';
import InnerForm from './components/InnerForm';
import { FormProps, FormValues } from './types';
import * as Yup from 'yup';
import instance from '@/utils/axiosInstance';
import { IUsers } from '@/interface/user.interface';

const RegisterSchema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  userEmail: Yup.string()
    .email('Invalid email address format')
    .required('Email is required'),
  userPassword: Yup.string().required('Password is required'),
  roleId: Yup.number().min(1, 'A role chosen is required'),
});

const RegisterView = () => {
  const router = useRouter();

  const register = async ({
    userEmail,
    userPassword,
    roleId,
    userName,
  }: IUsers) => {
    try {
      const body = { userEmail, userPassword, userRoleId: roleId, userName };
      await instance.post('/auth/register', body);

      router.push('/login');
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  const RegisterForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      userEmail: props.initialUserEmail || '',
      userPassword: props.initialUserPassword || '',
      roleId: props.initialRoleId || 0,
      userName: props.initialUserName || '',
    }),
    validationSchema: RegisterSchema,
    enableReinitialize: true,
    handleSubmit(
      { userEmail, userPassword, roleId, userName }: FormValues,
      { resetForm },
    ) {
      register({ userEmail, userPassword, roleId, userName });
      resetForm();
    },
  })(InnerForm);

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">Sign up your new account</Heading>
          </Stack>
          <RegisterForm />
        </Stack>
      </Center>
    </Container>
  );
};

export default RegisterView;
