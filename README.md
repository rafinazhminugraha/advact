Live App Link : [Click Me!](https://advact-rafi-nazhmi.vercel.app/ "Visit the app")

# Advact

A practical, structured guide to mastering the modern React ecosystem — built through a real-world project.

---

## About

This project started as a personal learning space to deeply understand advanced tools in the React ecosystem like:

* React Router
* TanStack Query
* Axios
* React Hook Form + Zod
* Redux Toolkit
* Zustand
* Testing (React Testing Library + Vitest)

At first, this was meant to be **just for me** — a place to organize everything I learn.

But along the way, I realized:

> "If this helps me understand things better, it might help others too."

So I decided to make it public.

---

## Goal

To provide a **clear, structured, and practical learning path** for developers who want to move beyond basic React and start thinking like a real-world frontend engineer.

This is not just theory.

Everything is built on top of one consistent project:

### TaskFlow — Team Task Management App

Each chapter incrementally improves the same app, so you can understand how modern tools actually work **together in production**, not in isolation.

---

## What Makes This Different?

* Project-based learning (not random examples)
* Focus on *mental models*, not just syntax
* Covers real-world patterns used in production
* Clean UI + structured navigation
* Beginner-friendly → Intermediate/Advanced bridge

---

## Learning Structure

The content is divided into multiple chapters:

1. **Routing** — using React Router like a pro
2. **Server State** — TanStack Query + Axios
3. **Forms & Validation** — React Hook Form + Zod
4. **State Management** — Redux Toolkit
5. **Lightweight State** — Zustand
6. **Testing** — RTL & Vitest

Each chapter includes:

* Explanation (What, Why, When)
* Mental model
* Code examples
* Common mistakes
* Practical integration into the project

---

## Tech Stack

* React
* React Router
* TanStack Query
* Axios
* Redux Toolkit
* Zustand
* React Hook Form
* Zod
* React Testing Library
* Vitest

---

## API Source for This Course

This learning app is frontend-first, so we use a local mock backend shipped in this repo:

* API root: `http://localhost:3001`
* Frontend base URL in env: `VITE_API_URL=http://localhost:3001/api`
* Mock API files:
* `mock-api/server.js`
* `mock-api/db.json`

### Run

```bash
# Install project dependencies (including mock API tools)
npm install

# Start mock API only
npm run api

# Start frontend + mock API together
npm run dev:full
```

### Endpoint Contract

* `GET /health` -> `{ "status": "ok" }`
* `GET /api/tasks` -> `Task[]`
* `GET /api/tasks/:id` -> `Task`
* `POST /api/tasks` -> create task (returns created task with id)
* `PATCH /api/tasks/:id` -> update task
* `DELETE /api/tasks/:id` -> delete task
* `POST /auth/login` -> `{ user, token }` for demo auth

Demo login credential for local mock auth:

* `email: rafi@taskflow.dev`
* `password: password123`

---

## Final Note

This project is still evolving as I learn.

So instead of being “perfect”,
this project is meant to be **real**.

---