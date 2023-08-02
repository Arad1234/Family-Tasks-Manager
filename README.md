# Family Tasks Manager App

A real-time family tasks manager app built using React.js, Redux, TypeScript (Front & Back), Node.js, Express.js, MongoDB, Socket.IO, JWT, Zod, MUI, and Supabase Auth.

## Overview

The Family Tasks Manager app enables families to establish a collaborative space for managing and delegating tasks among members while synchronizing seamlessly with their Google Calendar. Through Socket.IO, the app delivers real-time updates, ensuring all family members remain informed about the most recent task assignments and any modifications.

The app includes the following key features:

- User authentication using JWT (JSON Web Tokens)
- Create, update, and delete family rooms
- Add, update, and delete tasks within a family room
- Utilize Supabase Auth to synchronize the tasks with their Google Calendar.
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
  - Supabase: An open-source backend-as-a-service platform for simplified app development.
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

3. Create a Supabase and Google Cloud projects

4. Set up the environment variables:

   - Create a `.env` file in the `server` directory and add the following variables:

     - `MONGODB_URI`: MongoDB connection URI
     - `SECRET_KEY`: Secret key for JWT authentication

   - Create a `.env` file in the `client` directory and add the following variables:
     - `VITE_SUPABASE_PROJECT_URL`: Supabase project URL
     - `VITE_API_KEY`: Supabase project API key
     - `VITE_SCOPES`: Permissions scopes for the Google Calendar API.

5. Start the server and client:

   ```bash
   # Start the client (from the client directory)
   npm run dev

   # Start the server (from the server directory)
   npm run dev
   ```

6. Open the app in your browser:

   Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.
