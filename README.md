<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation using docker

```bash
$ npm install
$ npm run prisma:generate
$ make start
$ make build
```

## Migration

```bash
$ npm run prisma:migrate
$ npm run prisma:seed

```

## Test

```bash
$ npm run test

```

## Support

### Swagger

    http://localhost:8000/api

```

```
# Project Stories

## Overview

This project involves developing a task management application with authentication and API integration. The project is structured into three main parts: Planning, Backend, and Frontend.

## Project Planning

### Database Structure

- **Description**: Design and implement the database schema to support user authentication and task management.
- **Tasks**:
  - Define tables for users and tasks.
  - Set up relationships and constraints.
  - Ensure scalability and data integrity.

### Project Design and Structure

- **Description**: Set up the project structure using a monorepo approach and implement reusable libraries for authentication and database interaction.
- **Tasks**:
  - Configure a monorepo setup for the project.
  - Integrate Auth0 for authentication.
  - Implement a repository pattern for database access.

### UI/UX

- **Description**: Design the user interface and user experience for the application.
- **Tasks**:
  - Create wireframes and mockups.
  - Develop responsive designs.
  - Ensure accessibility and usability.

## BackEnd

### Authentication

#### User

- **Save User Info API**
  - **Description**: Implement an API to save user information into the database after login if the user does not already exist.
  - **Acceptance Criteria**:
    - Check if user exists by email and Auth0 user ID.
    - Save user details if not found.
- **Login and Sign-up API**
  - **Description**: Develop APIs for user login and sign-up for API authorization purposes.
  - **Acceptance Criteria**:
    - Implement endpoints for login and sign-up.
    - Ensure secure handling of user credentials.

### Task Management

- **Create Task**
  - **Description**: Implement API endpoint to create new tasks.
  - **Acceptance Criteria**:
    - API accepts task details and creates a new entry.
- **Update Task**
  - **Description**: Implement API endpoint to update task details, including changing status to completed.
  - **Acceptance Criteria**:
    - API allows task status updates and other modifications.
- **Delete Task**
  - **Description**: Implement API endpoint to delete tasks.
  - **Acceptance Criteria**:
    - API allows tasks to be removed from the database.
- **List Task**
  - **Description**: Implement API endpoint to list tasks with pagination.
  - **Acceptance Criteria**:
    - API supports pagination and returns a list of tasks.

## FrontEnd

### Authentication

- **Description**: Integrate Auth0 library for user authentication on the frontend.
- **Tasks**:
  - Implement Auth0 login and sign-up flows.
  - Handle authentication state and redirects.

### Redux

- **Description**: Set up Redux to manage and store authentication data.
- **Tasks**:
  - Create Redux actions and reducers for authentication.
  - Connect Redux with the Auth0 authentication state.

### Task Management Form Design

- **Description**: Design and implement forms for task management.
- **Tasks**:
  - Create forms for creating and updating tasks.
  - Ensure forms are user-friendly and validate input.

### Task Management API Integration

- **Description**: Integrate frontend with backend APIs for task management.
- **Tasks**:
  - Connect task management forms with backend APIs.
  - Handle API responses and display tasks.

## Testing

### Backend Tests

Jest is used for backend testing. To run the tests:

## License

Nest is [MIT licensed](LICENSE).

```

```

```

```

```
