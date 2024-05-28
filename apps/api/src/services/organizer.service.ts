import { IEvent, IEventTicket } from '@/interfaces/event.interface';
import { Event, TicketType } from '@prisma/client';
import { OrganizerQuery } from '@/queries/organizer.query';
import Container, { Service } from 'typedi';
import { filter } from '@/interfaces/filter.interface';

@Service()
export class OrganizerService {
  organizer = Container.get(OrganizerQuery);

  public createEventService = async (
    data: IEvent,
    file: any,
    userId: number,
  ): Promise<Event> => {
    try {
      const event = await this.organizer.createEventQuery(data, file, userId);
      return event;
    } catch (error) {
      throw error;
    }
  };

  public updateEventService = async (
    data: IEvent,
    file: any,
    userId: number,
    eventId: number,
  ): Promise<Event> => {
    try {
      const event = await this.organizer.updateEventQuery(
        data,
        file,
        userId,
        eventId,
      );
      return event;
    } catch (error) {
      throw error;
    }
  };

  public deleteEventService = async (eventId: number): Promise<Event> => {
    try {
      const event = await this.organizer.deleteEventQuery(eventId);

      return event;
    } catch (error) {
      throw error;
    }
  };

  public getEventsService = async (filters: filter): Promise<any> => {
    try {
      const events = await this.organizer.getEventsQuery(filters);

      return events;
    } catch (error) {
      throw error;
    }
  };

  public createEventTicketService = async (
    data: IEventTicket,
  ): Promise<TicketType> => {
    try {
      const events = await this.organizer.createEventTicketQuery(data);
      return events;
    } catch (error) {
      throw error;
    }
  };

  public getEventTicketService = async (
    eventId: number,
  ): Promise<TicketType[]> => {
    try {
      const ticket = await this.organizer.getEventTicketQuery(eventId);
      return ticket;
    } catch (error) {
      throw error;
    }
  };

  public updateEventTicketService = async (
    data: TicketType,
  ): Promise<TicketType> => {
    try {
      const ticket = await this.organizer.updateEventTicketQuery(data);
      return ticket;
    } catch (error) {
      throw error;
    }
  };
}
