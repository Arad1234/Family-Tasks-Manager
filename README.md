# Family Tasks Manager App

A real-time family tasks manager app built using React.js, Redux, TypeScript (Front & Back), Node.js, Express.js, MongoDB, Socket.IO, JWT, Zod, and MUI.

## Overview

The Family Tasks Manager app allows families to create a shared space where they can manage and assign tasks to family members. It provides real-time updates using Socket.IO, ensuring that everyone in the family stays up to date with the latest task assignments and changes.

The app includes the following key features:

- User authentication using JWT (JSON Web Tokens)
- Create, update, and delete family rooms
- Add, update, and delete tasks within a family room
- Real-time updates using Socket.IO
- Task assignment to family members
- Responsive user interface built with MUI (Material-UI)

## Technologies Used

The app is built using the following technologies and libraries:

- **Front-end:**
  - React.js: A popular JavaScript library for building user interfaces.
  - Redux: A predictable state management library for managing application state.
  - TypeScript: A typed superset of JavaScript that provides static typing.
  - MUI (Material-UI): A UI component library that follows Material Design principles.

- **Back-end:**
  - Node.js: A JavaScript runtime environment for server-side development.
  - Express.js: A minimal and flexible web application framework for Node.js.
  - MongoDB: A NoSQL database for storing data.
  - Socket.IO: A library for real-time, bidirectional communication between clients and servers.
  - JWT (JSON Web Tokens): A standard for secure authentication between client and server.
  - Zod: A TypeScript-first schema validation library for data validation.



## Setup and Installation

To run the Family Tasks Manager app locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Arad1234/Family-Tasks-Manager.git
   ```

2. Install dependencies:

   ```bash
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd server
   npm install
   ```

3. Set up the environment variables:

   - Create a `.env` file in the `server` directory and add the following variables:
     - `MONGODB_URI`: MongoDB connection URI
     - `SECRET_KEY`: Secret key for JWT authentication

4. Start the server and client:

   ```bash
   # Start the client (from the client directory)
   npm run dev
   
   # Start the server (from the server directory)
   npm run dev
   ```

5. Open the app in your browser:

   Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.
