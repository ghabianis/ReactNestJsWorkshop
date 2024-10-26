
# WorkShop NestJs & React FullStack Todo App

## Introduction
This workshop will guide participants through the development of a small full-stack application using **NestJS** for the backend, **React** for the frontend, **Prisma** for database ORM, and **PostgreSQL** as the database. The application will be containerized using **Docker**. By the end of the workshop, participants will have a basic understanding of how to build, connect, and deploy a full-stack application.

## Prerequisites
Before starting the workshop, participants should have the following:
- Basic understanding of **JavaScript/TypeScript**.
- Familiarity with **REST APIs**.
- **Docker** installed on your machine.
- **Node.js** and **npm** installed.

## Workshop Agenda

### 1. Introduction to the Project
We will develop a simple task management application where users can create, view, update, and delete tasks. This project will showcase a basic **CRUD** operation using a full-stack environment.

### 2. Setting Up the Backend with NestJS
- Install NestJS and create a new project.
- Set up the REST API for managing tasks (CRUD operations).
- Define task entities and services.

**Example Task Entity:**
```typescript
{
  id: number,
  title: string,
  description: string,
  isActive: true
}
```

### 3. Setting Up Prisma and PostgreSQL
Install and configure Prisma ORM.
Set up PostgreSQL in Docker and connect Prisma to the PostgreSQL database.
Define the database schema for the tasks.

## Example Prisma Schema:

```
model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  isActive    String
}

```

## Setup the react App With Vite:

```
npm create vite@latest

```


<hr> Let's hack the world 🐱‍💻

## To Run the project:
```
sudo chmod 777 ./start.sh
./start.sh

```


## start :
 ```
  # nest project creation
  npm init
  npm i @nestjs/cli  \\ nest cli
  nest new project-name
  nest g resource


  # prisma initialization
  npm i prisma
  npx prisma init

  #react vite
  npm create vite@latest
  
 ```

Feel free to modify any sections or examples as per your specific implementation details or additional requirements!
Copyright @ghabianis 