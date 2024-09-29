/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import bodyparser from 'body-parser';
import { generateFileFromApiPath, readDirRecursive } from './utils';

const app = express();

app.use(bodyparser.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.post('/_mock/api/create', async (request, response) => {
  console.log(JSON.stringify(request.body));
  const { apiPath } = request.body;
  if (!apiPath) {
    response.status(400).send({ messsage: 'apiPath is required' });
    return;
  }
  try {
    await generateFileFromApiPath(apiPath);
    response.status(200).send({ message: 'File created successfully' });
  } catch (e) {
    console.error(e);
    response.status(500).send({ error: 'Failed to create file' });
  }
});

app.get('/_mock/api/list', async (_, response) => {
  try {
    const mockAPIDir = path.join(__dirname, 'demo-rest');
    const files = readDirRecursive(mockAPIDir);
    response.status(200).send({ files });
  } catch (e) {
    console.error(e);
    response.status(500).send({ error: 'Failed to list files' });
  }
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to server!' });
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
