import express, { type Request, type Response } from 'express';
import assetlinks from './assetlinks.json';
import appleAppSiteAssociation from './apple-app-site-association.json';
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  return res.send('Hello World!');
});

app.get('/.well-known/assetlinks.json', (req: Request, res: Response) => {
  return res.json(assetlinks);
});

app.get('/.well-known/apple-app-site-association', (req: Request, res: Response) => {
  return res.json(appleAppSiteAssociation);
});

app.listen(port, () => {
  return console.log(`Express is listening at port ${port}`);
});