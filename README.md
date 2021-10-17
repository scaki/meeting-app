## Goal

The application is aimed to be an appointment management system. Appointments can be created, edited or canceled using the calendar. Appointments are specific to users as they are logged in with their email and password.

## Used Technologies

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Sass](https://sass-lang.com/)
- [Ant Design](https://ant.design/) (For ui components)
- [Miragejs](https://miragejs.com/) (For mock api server)
- [Docker](https://www.docker.com/)

## Run Project

[react-dotenv](https://www.npmjs.com/package/react-dotenv) is used for environment management. Before running the project, change the name of the ".env.example" file to ".env" and edit its contents.

to start without using docker

    $ npm run start

to run with docker

    $ npm run dev

## Publish

Before publishing the application, do not forget to define the environment variables on your server.

    $ npm build
