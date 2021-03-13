import express from 'express';
import v1Router from './api/v1Router';

const app = express();

app.use(express.json({ limit: '50mb' }));

app.use('/v1', v1Router);

export default app;
