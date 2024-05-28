import { OrganizerController } from '@/controllers/organizer.controller';
import { uploader } from '@/helpers/multer';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class OrganizerRouter {
  private router: Router;
  private Organizer: OrganizerController;
  private Guard: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.Organizer = new OrganizerController();
    this.Guard = new AuthMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    //// The Event
    //create event
    this.router.post(
      '/event',
      this.Guard.verifyToken,
      this.Guard.adminGuard,
      uploader('IMG', '/event').single('file'),
      this.Organizer.createEventController,
    );
    //update event
    this.router.patch(
      '/event/:id',
      this.Guard.verifyToken,
      this.Guard.adminGuard,
      uploader('IMG', '/event').single('file'),
      this.Organizer.updateEventController,
    );
    //delete event
    this.router.delete(
      '/event/:id',
      this.Guard.verifyToken,
      this.Guard.adminGuard,
      this.Organizer.deleteEventController,
    );
    //get all event
    this.router.get(
      '/event',
      // this.Guard.verifyToken,
      this.Organizer.getEventsController,
    );

    //// Ticketing
    //create event ticket
    this.router.post(
      '/event-ticket',
      this.Guard.verifyToken,
      this.Guard.adminGuard,
      this.Organizer.createEventTicketController,
    );

    //get all event ticket [id based on THE EVENT (EVENTID) NOT THE TICKET ]
    this.router.get(
      '/event-ticket/:id',
      this.Guard.verifyToken,
      this.Organizer.getEventTicketController,
    );

    this.router.patch(
      '/event-ticket',
      this.Guard.verifyToken,
      this.Guard.adminGuard,
      this.Organizer.updateEventTicketController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
