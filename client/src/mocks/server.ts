import { setupServer } from 'msw/node';
import { routes } from './routes';

export const server = setupServer(...routes);