'use client';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Field, Form, FormikProps } from 'formik';
import React, { useState } from 'react';
import { FormValues } from '../types';

export default function InnerForm(props: FormikProps<FormValues>) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  } = props;
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Form onSubmit={handleSubmit}>
      <VStack
        boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
        h="max-content !important"
        bg={useColorModeValue('white', 'gray.700')}
        rounded="lg"
        boxShadow="lg"
        p={{ base: 5, sm: 10 }}
        spacing={8}
      >
        <VStack spacing={5} w="100%">
          <FormControl
            id="names"
            isInvalid={!!errors.userName && touched.userName}
          >
            <FormLabel>Username</FormLabel>
            <Field
              as={Input}
              name="userName"
              id="userName"
              value={values.userName}
              rounded="md"
              type="text"
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.userName}</FormErrorMessage>
          </FormControl>
          <FormControl
            id="email"
            isInvalid={!!errors.userEmail && touched.userEmail}
          >
            <FormLabel>Email</FormLabel>
            <Field
              as={Input}
              name="userEmail"
              id="userEmail"
              value={values.userEmail}
              rounded="md"
              type="email"
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.userEmail}</FormErrorMessage>
          </FormControl>
          <FormControl
            id="password"
            isInvalid={!!errors.userPassword && touched.userPassword}
          >
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Field
                as={Input}
                name="userPassword"
                id="userPassword"
                value={values.userPassword}
                rounded="md"
                type={show ? 'text' : 'password'}
                onChange={handleChange}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  rounded="md"
                  bg={useColorModeValue('gray.300', 'gray.700')}
                  _hover={{
                    bg: useColorModeValue('gray.400', 'gray.800'),
                  }}
                  onClick={handleClick}
                >
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.userPassword}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.roleId && touched.roleId}>
            <FormLabel>Choose a role</FormLabel>
            <RadioGroup
              value={String(values.roleId)}
              onChange={(e) => setFieldValue('roleId', Number(e))}
            >
              <Stack direction="row">
                <Radio value="1">Basic user</Radio>
                <Radio value="2">Event Organizer</Radio>
              </Stack>
            </RadioGroup>
            <FormErrorMessage>{errors.roleId}</FormErrorMessage>
          </FormControl>
        </VStack>
        <VStack w="100%">
          <Button
            bg="green.300"
            color="white"
            _hover={{
              bg: 'green.500',
            }}
            rounded="md"
            w="100%"
            mt={10}
            isDisabled={isSubmitting}
            type="submit"
          >
            Sign in
          </Button>
        </VStack>
      </VStack>
    </Form>
  );
}
