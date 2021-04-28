import React, { useContext } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Text,
  Divider,
  Spinner,
  Alert,
  AlertTitle,
  AlertIcon
} from '@chakra-ui/react';

import { StateContext } from 'lib/ctx';

const Login = () => {
  const [machine, sendToMachine] = useContext(StateContext);
  const { error, loading } = machine.context;
  const defaultValues = {
    email: process.env.NEXT_PUBLIC_EMAIL,
    password: process.env.NEXT_PUBLIC_PASSWORD
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Please provide a valid email')
      .required('Rquired'),
    password: yup.string().required('Required')
  });

  const { register, handleSubmit, errors } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const onSubmit = (values) => {
    console.log('form data', values);
    sendToMachine('LOGIN', { values });
  };

  return (
    <>
      <Box maxHeight="100%" overflow="auto">
        <center>
          <Text fontSize="xl" fontWeight="medium" mb="10px">
            Sign In
          </Text>
        </center>
        <Divider mb="40px" />
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mx={2}>{error}!</AlertTitle>
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.email} mt={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id={'email'}
              type="email"
              name="email"
              placeholder="email"
              ref={register}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password} mt={4}>
            <FormLabel htmlFor="password">password</FormLabel>
            <Input
              id={'password'}
              type="password"
              name="password"
              placeholder="password"
              ref={register}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          {!loading && (
            <Button mt={4} type="submit" width="100%">
              Submit
            </Button>
          )}
          {loading && <Spinner />}
        </form>
      </Box>
      <Divider />
    </>
  );
};
export default Login;
