# NestJS Grocery Project

Welcome to the NestJS Grocery Project! This project is a sample application built with NestJS, a progressive Node.js framework for building efficient, reliable, and scalable server-side applications.

## Table of Contents
- [Introduction](#introduction)
- [API Documentation](#api-documentation)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Routes](#routes)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This API provides functionality for managing a grocery, including adding, deleting, and updating grocery, as well as order for the products. It having two roles

## API Documentation

API documentation is available at the `/api` endpoint. You can access the Swagger UI to explore and interact with the API endpoints.

To access the Swagger documentation:

1. Ensure that the application is running.
2. Open your web browser and navigate to `[Endpoint]/api`.

## Setup

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/ravipateldhg/qp-assessment.git

2. Build docker image:

   ```bash
   docker-compose up --build

## Environment Variables

Before running the application, make sure to configure the following environment variables:

- `NODE_ENV`: Environment mode (e.g., `development`, `production`).
- `PORT`: Port on which the server will listen.

- `DB_HOST`: Hostname or IP address of the database server.
- `DB_PORT`: Port on which the database server is running.
- `DB_USER`: Username for authenticating with the database server.
- `DB_PASS`: Password for authenticating with the database server.
- `DB_NAME`: Name of the database to connect to.

- `JWT_TOKEN_SECRET`: Secret key for generating and verifying JWT tokens.

  ```bash
   NODE_ENV=
   PORT=
   DB_HOST=
   DB_PORT=
   DB_USER=
   DB_PASS=
   DB_NAME=
   JWT_TOKEN_SECRET=

## Usage

Once the server is running, you can use tools like Postman or curl to interact with the API endpoints.

## Routes

The API provides the following routes:

* /api/v1/auth: JWT token endpoints.
* /api/v1/user: User-related endpoints.
* /api/v1/product: Product-related endpoints.
* /api/v1/order: Order-related endpoints.

For detailed route information, refer to the Swagger YAML file.

## Technologies Used

* Node.js
* NestJS
* PostgreSQL
* TypeScript
* TypeORM
* Swagger

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License