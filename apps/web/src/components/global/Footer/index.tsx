'use client';
import {
  Box,
  Button,
  Container,
  Img,
  Stack,
  Text,
  VisuallyHidden,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <Button
      bg={'whiteAlpha.100'}
      rounded={'full'}
      w={14}
      h={14}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: 'whiteAlpha.100',
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  );
};

export default function Footer() {
  return (
    <Box bg={'gray.900'} color={'gray.200'}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Img src={'/assets/logo.png'} alt="logo" w={'150px'}></Img>
        <Text>© 2024 Dunkirk EO. All rights reserved</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton
            label={'Github'}
            href={'https://github.com/irvansaputra-irsa'}
          >
            <FaGithub color="white" />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
