'use client';

import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Field, Form, FormikProps } from 'formik';
import React, { useState } from 'react';
import { FormValues } from '../types';

export default function InnerForm(props: FormikProps<FormValues>) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    props;
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
        <VStack spacing={4} w="100%">
          <FormControl
            id="email"
            isInvalid={!!errors.userEmail && touched.userEmail}
          >
            <FormLabel>Email</FormLabel>
            <Field
              name="userEmail"
              id="userEmail"
              as={Input}
              rounded="md"
              type="email"
              value={values.userEmail}
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
                rounded="md"
                type={show ? 'text' : 'password'}
                value={values.userPassword}
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
        </VStack>
        <VStack w="100%">
          <Stack direction="row" justifyContent="space-between" w="100%">
            <Checkbox colorScheme="green" size="md">
              Remember me
            </Checkbox>
          </Stack>
          <Button
            bg="green.300"
            color="white"
            _hover={{
              bg: 'green.500',
            }}
            rounded="md"
            w="100%"
            disabled={isSubmitting}
            type="submit"
          >
            Sign in
          </Button>
        </VStack>
      </VStack>
    </Form>
  );
}
