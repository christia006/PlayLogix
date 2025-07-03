# GameVerse

Full stack applicaton with express backend, PostgreSQL database and Vue 3 frontend. TypeScript supported both on the front and the back. TailwindCSS for styling.

## Authentication 
  JWT workflow. Token is saved in local storage, sent from the client and then decoded on the backend on authentication and particular requests.

## Models: Game / Review / Console / GameConsole / Genre / GameGenre 

## State Management: Pinia stores are to be found in stores folder.

## Features:
  - Sign up / Login
  - Overview of the games on the homepage (GET request),
  - CRUD operations per review per game (POST, PUT and DELETE requests, real time updates on the client),
  - Upload image, change name and email information for your account,
  - Overview of the users on the dashboard page for ADMIN users only,
  - Admin dashboard: control user information. Delete users (DELETE request, Authorization middleware running on the backend preventing non admin users from reaching dashboard page),
  - Responsive for mobile devices.


## Technologies Used:
  - Node
  - Express
  - PostgreSQL
  - Prisma
  - JWT
  - Vue 3 (pinia, vue router)
  - zod
  - TailwindCSS
  - TypeScript
