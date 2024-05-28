'use client';
import { Box, Heading, Image, Link, Stack, useQuery } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCalendarTimes } from 'react-icons/fa';
import instance from '@/utils/axiosInstance';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchEvents } from '@/lib/features/event/eventSlice';

export default function page() {
  return (
    <Box>
      <Box>
        <Heading size={'4xl'}>List of your event</Heading>
      </Box>
      <Box>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justifyContent="center"
        >
          <Box>
            <Image
              boxShadow="lg"
              w="100%"
              h="100%"
              minW={{ base: 'auto', md: '30rem' }}
              maxH="20rem"
              objectFit="cover"
              src={`https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80`}
              rounded="md"
              alt="event_pic"
            ></Image>
          </Box>
          <Box>
            <Stack direction="column" spacing={6} justifyContent="center">
              <Heading
                fontSize="5xl"
                lineHeight={1}
                fontWeight="bold"
                textAlign="left"
              >
                Nama event
              </Heading>
              <Box>
                <Box>Event Description</Box>
                <Box mt={4} display={'flex'}>
                  <Box pt={1}>
                    <FaLocationDot />
                  </Box>
                  event Location
                </Box>
                <Box mt={4} display={'flex'}>
                  <Box pt={1}>
                    <FaCalendarTimes />
                  </Box>
                  event time and date
                </Box>
              </Box>
              <Link href="#" fontSize="sm" color="blue.400">
                Edit your event information
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
