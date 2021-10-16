/* eslint-disable no-shadow */
import { JSONAPISerializer, Model, Response, Server } from 'miragejs';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import users from './users.json';

export function makeServer() {
  const server = new Server({
    serializers: {
      application: JSONAPISerializer,
    },

    models: {
      user: Model,
    },

    seeds(server) {
      server.db.loadData({ users });
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
              { message: "YOU'VE DECODED ME!" },
              process.env.REACT_APP_JWT_SECRET_KEY
            );
            return { token: encodedToken };
          }
        }
        return new Response(
          400,
          {},
          { error: 'USER_NOT_FOUND', message: 'User not found' }
        );
      });
    },
  });

  return server;
}
