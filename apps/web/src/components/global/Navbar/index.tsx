'use client';

import React from 'react';
import {
  Box,
  Flex,
  Img,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/next-js';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { signOut } from '@/lib/features/auth/authSlice';

interface Props {
  children: childrenNode;
}

interface childrenNode {
  nav: string;
  name: string;
}
const NavbarList = (props: Props) => {
  const { children } = props;
  const dispatch = useAppDispatch();
  const current = usePathname().slice(1);
  return (
    <Link
      href={`/${children?.nav}`}
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: 'white',
        color: 'black',
      }}
      color={current === children.nav ? 'black' : 'white'}
      bg={current === children.nav ? 'white' : 'black'}
      onClick={() => (children.name === 'Logout' ? dispatch(signOut()) : '')}
    >
      {children?.name}
    </Link>
  );
};

export default function Navbar() {
  const navList = () => {
    if (isLogin == false) {
      return [
        {
          name: 'Home',
          nav: '',
        },
        {
          name: 'Event Management',
          nav: 'event',
        },

        {
          name: 'Login',
          nav: 'login',
        },
        {
          name: 'Register',
          nav: 'register',
        },
      ];
    } else {
      return [
        {
          name: 'Home',
          nav: '',
        },
        {
          name: 'Event Management',
          nav: 'event',
        },

        {
          name: 'Logout',
          nav: 'login',
        },
      ];
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLogin } = useAppSelector((state) => state.auth.status);
  return (
    <Box w={'100vw'} bg={'black'} color={'white'} px={16}>
      <Flex
        justifyContent={'space-between'}
        py={5}
        alignItems={'center'}
        h={'100%'}
      >
        <Box display={{ base: 'none', sm: 'block' }}>
          <Link href="/">
            <Img src={'/assets/logo.png'} alt="logo" w={'150px'}></Img>
          </Link>
        </Box>
        <Box>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            color={'black'}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {navList().map((link, idx) => (
                <NavbarList key={idx}>{link}</NavbarList>
              ))}
            </HStack>
          </HStack>
        </Box>
      </Flex>
      {isOpen ? (
        <Box
          pb={4}
          h={'full'}
          display={{ md: 'none' }}
          bg={'black'}
          color={'white'}
        >
          <Stack as={'nav'} spacing={4}>
            {navList().map((link, idx) => (
              <NavbarList key={idx}>{link}</NavbarList>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
