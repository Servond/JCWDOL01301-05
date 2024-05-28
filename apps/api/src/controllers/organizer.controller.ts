import { OrganizerService } from '@/services/organizer.service';
import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import express from 'express';

export class OrganizerController {
  organizer = Container.get(OrganizerService);

  public express: express.Application;

  public createEventController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { file } = req;
      const data = await this.organizer.createEventService(
        req.body,
        file,
        Number(req.user.id),
      );

      res.status(201).json({
        message: 'Create New Event Success',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateEventController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { file } = req;
      const { id } = req.params;
      const data = await this.organizer.updateEventService(
        req.body,
        file,
        Number(req.user.id),
        Number(id),
      );

      res.status(200).json({
        message: 'Update Event Success',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteEventController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.organizer.deleteEventService(Number(id));

      res.status(200).json({
        message: 'Delete Event Success',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  public getEventsController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const filters = req.query;
      const { data, page, pageSize, totalRows, totalPage } =
        await this.organizer.getEventsService(filters);

      res.status(200).json({
        message: 'Get all Event Success',
        data,
        page,
        pageSize,
        totalRows,
        totalPage,
      });
    } catch (error) {
      next(error);
    }
  };

  public createEventTicketController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const events = req.body;
      const data = await this.organizer.createEventTicketService(events);
      res.status(201).json({
        message: 'Create Event Ticket Success',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  public getEventTicketController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.organizer.getEventTicketService(Number(id));
      res.status(200).json({
        message: 'Get Event Ticket Success',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateEventTicketController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const events = req.body;
      const data = await this.organizer.updateEventTicketService(events);
      res.status(200).json({
        message: 'Update Event Ticket Success',
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}
