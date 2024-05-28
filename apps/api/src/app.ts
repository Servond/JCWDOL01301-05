import 'reflect-metadata';
import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import path from 'path';
import { PORT } from './config';
import { SampleRouter } from './routers/sample.router';
import { AuthRouter } from './routers/auth.router';
import { OrganizerRouter } from './routers/organizer.router';
import { ErrorMiddleware } from './middlewares/error.middleware';

export default class App {
  private app: Express;

  public corsOptions = {
    exposedHeaders: 'Authorization',
  };

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors(this.corsOptions));
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use('/images', express.static(path.join(__dirname, 'public')));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    // this.app.use(
    //   (err: Error, req: Request, res: Response, next: NextFunction) => {
    //     if (req.path.includes('/api/')) {
    //       console.error('Error : ', err.stack);
    //       res.status(500).json({
    //         message: err.message,
    //       });
    //     } else {
    //       next();
    //     }
    //   },
    // );
    // error handler
    this.app.use(ErrorMiddleware);
  }

  private routes(): void {
    const sampleRouter = new SampleRouter();
    const authRouter = new AuthRouter();
    const organizerRouter = new OrganizerRouter();

    this.app.get('/', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student !`);
    });

    this.app.use('/api/samples', sampleRouter.getRouter());

    this.app.use('/api/auth', authRouter.getRouter());

    this.app.use('/api/organizer', organizerRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
