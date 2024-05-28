'use client';
import { fetchEvents, setPageChanged } from '@/lib/features/event/eventSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import { Box, Heading, Image, Link, Stack, Text } from '@chakra-ui/react';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCalendarTimes } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { number } from 'yup';

export default function Home() {
  const { events, page, limit, pages, rows } = useAppSelector((state) => {
    return state.event;
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEvents(page, limit));
  }, [dispatch]);

  const correctDate = (date: string) => {
    return new Date(date).toDateString();
  };

  type dataPage = {
    selected: number;
  };

  const changePage = (data: dataPage) => {
    dispatch(fetchEvents(data.selected));
  };

  const base_image = `${process.env.IMAGE_URL}/event`;

  return (
    <Box
      bgImage={
        'linear-gradient(to left top, #ffffff, #eef1f4, #dae5e6, #cad8d2, #c4c9bb)'
      }
    >
      <Box>
        <Heading size={'4xl'}>List of available event</Heading>
      </Box>
      <Box p={'30'}>
        {events?.map((el, idx) => (
          <Box key={idx} my={10}>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              justifyContent="center"
            >
              <Box mr={10}>
                <Image
                  boxShadow="lg"
                  w="40rem"
                  h="25rem"
                  minW={{ base: 'auto', md: '30rem' }}
                  // maxW="40rem"
                  // maxH="25rem"
                  objectFit="cover"
                  src={base_image + '/' + el.eventImage}
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
                    {el.eventName}
                  </Heading>
                  <Box>
                    <Box>{el.eventDescription}</Box>
                    <Box mt={4} display={'flex'}>
                      <Box pt={1}>
                        <FaLocationDot />
                      </Box>
                      {el.eventLocationName}
                    </Box>
                    <Box mt={4} display={'flex'}>
                      <Box pt={1}>
                        <FaCalendarTimes />
                      </Box>
                      {correctDate(el.eventDateTime).toString()}
                    </Box>
                  </Box>
                  <Link href="#" fontSize="sm" color="blue.400">
                    Buy the ticket here
                  </Link>
                </Stack>
              </Box>
            </Stack>
          </Box>
        ))}
      </Box>
      <Text>
        Total rows : {rows} Page: {rows ? page + 1 : 0} of {pages}
      </Text>
      <Box mx="auto">
        <ReactPaginate
          previousLabel={'< Prev'}
          nextLabel={'> Next'}
          pageCount={pages}
          onPageChange={changePage}
        />
      </Box>
    </Box>
  );
}
