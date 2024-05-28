interface IEvent {
  eventName: string;
  eventDateTime: Date;
  eventLocationName: string;
  eventLocationURL: string;
  eventDescription: string;
  eventImage: string;
  eventBookingStart: Date;
  eventBookingEnd: Date;
  eventTnc: string;
  eventMaxCapacity: number;
  isFree: boolean;
  eventCategoriesId: number;
  userId: number;
}

interface IEventTicket {
  ticketTypeName: string;
  ticketTypePrice: number;
  ticketTypeDescription: string;
  ticketTypeQuota: number;
  eventId: number;
}

export { IEventTicket, IEvent };
