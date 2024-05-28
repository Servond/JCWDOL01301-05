import { IEvent, IEventTicket } from '@/interfaces/event.interface';
import { convertToISOFormat } from '@/utils/convert.utils';
import { Event, TicketType } from '@prisma/client';
import { Request } from 'express';
import Container, { Service } from 'typedi';
import fs from 'fs';
import { join } from 'path';
import prisma from '@/prisma';
import { filter } from '@/interfaces/filter.interface';

@Service()
export class OrganizerQuery {
  public createEventQuery = async (
    data: IEvent,
    file: any,
    userId: number,
  ): Promise<Event> => {
    try {
      const t = await prisma.$transaction(async () => {
        try {
          const {
            eventName,
            eventDateTime,
            eventLocationName,
            eventLocationURL,
            eventDescription,
            eventBookingStart,
            eventBookingEnd,
            eventTnc,
            eventMaxCapacity,
            isFree,
            eventCategoriesId,
          } = data;
          const event = await prisma.event.create({
            data: {
              eventName,
              eventDateTime: convertToISOFormat(eventDateTime),
              eventLocationName,
              eventLocationURL,
              eventDescription,
              eventBookingStart: convertToISOFormat(eventBookingStart),
              eventBookingEnd: convertToISOFormat(eventBookingEnd),
              eventTnc,
              eventMaxCapacity: Number(eventMaxCapacity),
              isFree: Number(isFree) === 1,
              eventCategoriesId: Number(eventCategoriesId),
              userId,
              eventImage: file.filename,
            },
          });
          return event;
        } catch (error) {
          throw error;
        }
      });
      return t;
    } catch (error) {
      throw error;
    }
  };

  public updateEventQuery = async (
    data: IEvent,
    file: any,
    userId: number,
    eventId: number,
  ): Promise<Event> => {
    try {
      const {
        eventName,
        eventDateTime,
        eventLocationName,
        eventLocationURL,
        eventDescription,
        eventBookingStart,
        eventBookingEnd,
        eventTnc,
        eventMaxCapacity,
        isFree,
        eventCategoriesId,
      } = data;

      //delete current actual image
      const { eventImage } = await this.getEventDetailQuery(eventId);
      if (eventImage) {
        const defaultDir = join(__dirname, '../public/', 'event');
        fs.unlinkSync(defaultDir + '/' + eventImage);
      }

      //then, delete the event
      const event = await prisma.event.update({
        where: {
          id: eventId,
        },
        data: {
          eventName,
          eventDateTime: convertToISOFormat(eventDateTime),
          eventLocationName,
          eventLocationURL,
          eventDescription,
          eventBookingStart: convertToISOFormat(eventBookingStart),
          eventBookingEnd: convertToISOFormat(eventBookingEnd),
          eventTnc,
          eventMaxCapacity: Number(eventMaxCapacity),
          isFree: Number(isFree) === 1,
          eventCategoriesId: Number(eventCategoriesId),
          userId,
          eventImage: file.filename,
        },
      });
      return event;
    } catch (error) {
      throw error;
    }
  };

  public deleteEventQuery = async (id: number): Promise<Event> => {
    try {
      const data = await prisma.event.delete({
        where: {
          id,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  public getEventsQuery = async (filters: filter): Promise<Object> => {
    try {
      // nanti tambahin filter!
      const { page = 0, pageSize = 10 } = filters;

      //jumlah total data
      const totalRows = await prisma.event.count();

      //jumlah total page
      const totalPage = Math.ceil(totalRows / pageSize);

      const data = await prisma.event.findMany({
        skip: page ? (Number(page) - 1) * Number(pageSize) : 0,
        take: pageSize ? Number(pageSize) : totalRows,
      });

      return { data, page, pageSize, totalRows, totalPage };
    } catch (error) {
      throw error;
    }
  };

  public getEventDetailQuery = async (id: number): Promise<Event> => {
    try {
      const data = await prisma.event.findFirst({
        where: {
          id,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  public createEventTicketQuery = async (
    events: IEventTicket,
  ): Promise<TicketType> => {
    try {
      const t = await prisma.$transaction(async (prisma) => {
        try {
          const {
            ticketTypeName,
            ticketTypePrice,
            ticketTypeDescription,
            ticketTypeQuota,
            eventId,
          } = events;

          const data = await prisma.ticketType.create({
            data: {
              ticketTypeName,
              ticketTypePrice,
              ticketTypeDescription,
              ticketTypeQuota,
              eventId,
            },
          });
          return data;
        } catch (error) {
          throw error;
        }
      });
      return t;
    } catch (error) {
      throw error;
    }
  };

  public getEventTicketQuery = async (
    eventId: number,
  ): Promise<TicketType[]> => {
    try {
      const data = await prisma.ticketType.findMany({
        where: {
          eventId,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  public updateEventTicketQuery = async (
    event: TicketType,
  ): Promise<TicketType> => {
    try {
      const t = await prisma.$transaction(async (prisma) => {
        try {
          const {
            id,
            ticketTypeName,
            ticketTypePrice,
            ticketTypeDescription,
            ticketTypeQuota,
            eventId,
          } = event;

          const data = await prisma.ticketType.update({
            data: {
              ticketTypeName,
              ticketTypePrice,
              ticketTypeDescription,
              ticketTypeQuota,
              eventId,
            },
            where: {
              id,
            },
          });
          return data;
        } catch (error) {
          throw error;
        }
      });
      return t;
    } catch (error) {
      throw error;
    }
  };
}
