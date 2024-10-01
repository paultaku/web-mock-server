import cors from 'cors';
import express from 'express';
import * as path from 'path';
import bodyparser from 'body-parser';
import { generateFileFromApiPath, readDirRecursive } from './utils';

const app = express();
app.use(bodyparser.json());
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.post('/_mock/api/create', async (request, response) => {
  const { apiPath, method } = request.body;
  if (!apiPath) {
    response.status(400).send({ messsage: 'apiPath is required' });
    return;
  }
  if (!method) {
    response.status(400).send({ messsage: 'method is required' });
    return;
  }

  try {
    const { success, message } = await generateFileFromApiPath({
      baseFolder: path.join(__dirname, 'demo-rest'),
      apiPath,
      method,
    });
    if (success) {
      response.status(200).send({ message: message });
    } else {
      response.status(400).send({ message: message });
    }
  } catch (e) {
    console.error(e);
    response.status(500).send({ message: 'Failed to create file' });
  }
});

app.get('/_mock/api/list', async (_, response) => {
  try {
    const mockAPIDir = path.join(__dirname, 'demo-rest');
    const directories = readDirRecursive(mockAPIDir);
    console.log(directories);
    response.status(200).send({ directories });
  } catch (e) {
    console.error(e);
    response.status(500).send({ error: 'Failed to list files' });
  }
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
