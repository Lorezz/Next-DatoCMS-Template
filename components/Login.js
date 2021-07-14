import React, { useState } from 'react';
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

const Login = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: '',
    password: 'process.env.NEXT_PUBLIC_PASSWORD'
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

  const sendToServer = async (values) => {
    setError(null);
    setLoading(true);
    try {
      const fakeData = {
        title: 'xxxxxx',
        body: 'zzzzzzzzzz'
      };
      await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fakeData)
      });
    } catch (error) {
      console.error(error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (values) => {
    console.log('form data', values);
    sendToServer(values);
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
