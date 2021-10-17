/* eslint-disable no-bitwise */
/* eslint-disable no-shadow */
import { JSONAPISerializer, Model, Response, Server } from 'miragejs';
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
  const server = new Server({
    serializers: {
      application: JSONAPISerializer,
    },

    models: {
      user: Model,
      meetings: Model,
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
        return new Response(
          410,
          {},
          { error: 'USER_NOT_FOUND', message: 'User not found' }
        );
      });

      this.post('/meets', (schema, request) => {
        const { Authorization } = request.requestHeaders;
        try {
          const uid = getUserIdFromToken(Authorization);
          const body = JSON.parse(request.requestBody);
          const data = {
            id: createUUID(),
            title: body.title,
            description: body.description,
            date: body.date,
            status: 'ACTIVE',
            userId: uid,
            createdAt: new Date(),
            deletedAt: null,
            updatedAt: null,
          };
          schema.db.meetings.insert(data);
          return { ...data, userId: undefined };
        } catch (error) {
          return new Response(
            400,
            {},
            {
              error: 'BAD_REQUEST',
              message: 'There is a problem. Please contact the administrator',
            }
          );
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
          return new Response(
            400,
            {},
            {
              error: 'BAD_REQUEST',
              message: 'There is a problem. Please contact the administrator',
            }
          );
        }
      });
    },
  });

  return server;
}
