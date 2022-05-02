import 'reflect-metadata';
import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // insert new users for test
    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(User, {
    //     firstName: 'Timber',
    //     lastName: 'Saw',
    //     age: 27,
    //   }),
    // );

    console.log('Express server has started on port 3000. Open http://localhost:3000/users to see results');
  })
  .catch((error) => console.log(error));
