/* eslint-disable no-bitwise */
/* eslint-disable no-shadow */
import { JSONAPISerializer, Model, Response, Server } from 'miragejs';
import moment from 'moment';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import users from './users.json';
import meetings from './meetings.json';

export function makeServer() {
  const createUUID = () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });

  const getUserIdFromToken = token => {
    const pureToken = token.replace('Bearer ', '');
    const { uid } = jwt.verify(pureToken, process.env.REACT_APP_JWT_SECRET_KEY);
    return uid;
  };

  const userNotFound = new Response(
    410,
    {},
    { error: 'USER_NOT_FOUND', message: 'User not found' }
  );

  const badRequest = new Response(
    400,
    {},
    {
      error: 'BAD_REQUEST',
      message: 'There is a problem. Please contact the administrator',
    }
  );

  const notAccept = message =>
    new Response(
      406,
      {},
      {
        error: 'NOT_ACCEPT',
        message,
      }
    );
  const server = new Server({
    serializers: {
      application: JSONAPISerializer,
    },

    models: {
      user: Model,
      meetings: Model,
      movie: Model,
    },

    seeds(server) {
      server.db.loadData({ users, meetings });
    },

    routes() {
      this.namespace = 'api';

      this.post('/auth/login', (schema, request) => {
        const body = JSON.parse(request.requestBody);
        const user = schema.db.users.findBy({ email: body.email });
        if (user !== null) {
          const hashedPassword = md5(body.password);
          if (hashedPassword === user.password) {
            const encodedToken = jwt.sign(
              { uid: user.id },
              process.env.REACT_APP_JWT_SECRET_KEY
            );
            return { token: encodedToken };
          }
        }
        return userNotFound;
      });

      this.get('/user/me', (schema, request) => {
        const { Authorization } = request.requestHeaders;
        try {
          const uid = getUserIdFromToken(Authorization);
          const user = schema.db.users.find(uid);
          user.password = undefined;
          return user;
        } catch (error) {
          return userNotFound;
        }
      });

      this.post('/meets', (schema, request) => {
        const { Authorization } = request.requestHeaders;
        try {
          const uid = getUserIdFromToken(Authorization);
          const body = JSON.parse(request.requestBody);
          const checkMeeting = schema.db.meetings.find({ date: body.date });
          if (checkMeeting === null) {
            const data = {
              id: createUUID(),
              title: body.title,
              description: body.description,
              date: body.date,
              status: 'ACTIVE',
              type: body.type,
              userId: uid,
              createdAt: new Date(),
              deletedAt: null,
              updatedAt: null,
            };
            schema.db.meetings.insert(data);
            return { ...data, userId: undefined };
          }
          return notAccept(
            `You already have an appointment on ${moment(body.date).format(
              'YYYY-MM-DD HH:mm'
            )} Please select another date`
          );
        } catch (error) {
          return badRequest;
        }
      });

      this.get('/meets', (schema, request) => {
        const { Authorization } = request.requestHeaders;
        try {
          const uid = getUserIdFromToken(Authorization);
          const result = schema.db.meetings.where({
            userId: uid,
            deletedAt: null,
          });
          return result;
        } catch (error) {
          return badRequest;
        }
      });

      this.get('/meets/:id', (schema, request) => {
        const { Authorization } = request.requestHeaders;
        try {
          const uid = getUserIdFromToken(Authorization);
          const { id } = request.params;
          const result = schema.db.meetings.findBy({
            id,
            userId: uid,
            deletedAt: null,
          });
          return result;
        } catch (error) {
          return badRequest;
        }
      });

      this.put('/meets/:id', (schema, request) => {
        const { Authorization } = request.requestHeaders;
        try {
          const uid = getUserIdFromToken(Authorization);
          const { id } = request.params;
          const body = JSON.parse(request.requestBody);

          const checkMeeting = schema.db.meetings.find({ date: body.date });
          if (checkMeeting === null) {
            const meeting = schema.db.meetings.update(
              {
                id,
                userId: uid,
                deletedAt: null,
              },
              {
                title: body.title,
                description: body.description,
                date: body.date,
                status: body.status,
                type: body.type,
              }
            );
            return meeting[0];
          }
          return notAccept(
            `You already have an appointment on ${moment(body.date).format(
              'YYYY-MM-DD HH:mm'
            )} Please select another date`
          );
        } catch (error) {
          return badRequest;
        }
      });

      this.get('/meets/date/:date', (schema, request) => {
        const { Authorization } = request.requestHeaders;
        try {
          const uid = getUserIdFromToken(Authorization);
          const { date } = request.params;
          const result = schema.db.meetings.where({
            userId: uid,
            deletedAt: null,
          });
          return result.filter(
            item => moment(item.date).format('DD-MM-YYYY') === date
          );
        } catch (error) {
          return badRequest;
        }
      });
    },
  });

  return server;
}
