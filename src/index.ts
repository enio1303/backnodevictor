import http from 'http';
import * as dotenv from 'dotenv';
import app from './app';

dotenv.config()

const server = http.createServer(app);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on port ${port}.`));
