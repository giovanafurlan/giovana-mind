# Giovana's Mind - Chatbot Project

## Overview
Giovana's Mind is a chatbot that allows users to ask questions about Giovana's life. The project is built with modern web technologies to create an interactive and engaging experience.

## Figma
https://www.figma.com/design/U9nT3Cb2nw4yLtoGA6S09J/AI-Chatbot-UI--Community-?node-id=0-1&t=Qr3Vp8rvPGPDp1Lz-1

## Prerequisites
* Node.js v22.13.1 installed
  
## Getting Started
### Installation
1. Clone the repository:
```bash
git clonoe https://github.com/giovanafurlan/giovana-mind/
```
3. Add the environment file
https://drive.google.com/file/d/14WLAbXT-8lzla24tbQ3K-YCUnBNtNFh8/view?usp=sharing
5. Install dependencies:
```bash
npm install
```
5. Run the development server:
```bash
npm run dev
```
   
## Key Libraries Used
### Core Dependencies
* Next.js (15.2.5): A React framework for server-rendered applications that enables hybrid static & server rendering, TypeScript support, smart bundling, and more.
* React (19.0.0): A JavaScript library for building user interfaces with components.
* React DOM (19.0.0): Serves as the entry point to the DOM and server renderers for React.
  
## Database & Backend
* @prisma/client (6.6.0): A type-safe database client for TypeScript and Node.js that provides an ORM-like experience.
* prisma (6.6.0): Next-generation Node.js and TypeScript ORM for databases.
* better-sqlite3 (11.9.1): The fastest and simplest library for SQLite3 in Node.js (used by Prisma).
  
## UI & Animation
* framer-motion (12.6.3): A production-ready motion library for React that makes creating animations easy.
* lucide-react (0.487.0): A beautiful, consistent icon toolkit for React applications.
* tailwindcss (4): A utility-first CSS framework for rapidly building custom designs.
  
## Authentication & Services
* firebase (11.4.0): Google's mobile platform that helps quickly develop high-quality apps (likely used for authentication or backend services).
  
## Development Tools
* TypeScript (5.8.3): A typed superset of JavaScript that compiles to plain JavaScript.
* ESLint (9): A pluggable linting utility for JavaScript and TypeScript.
* ts-node (10.9.2): TypeScript execution environment and REPL for Node.js.
  
## Scripts
* dev: Starts the development server with Turbopack
* build: Runs the custom Vercel build script
* postinstall: Automatically generates Prisma client after installation
* start: Starts the production server
* lint: Runs ESLint to check code quality
  
## Database Seeding
The project includes a Prisma seed script (prisma/seed-personal-facts.ts) that populates the database with personal facts about Giovana.

## Future Plans

### Hosting
* Vercel Deployment: The project will be hosted on Vercel, leveraging its serverless functions and edge network for optimal performance and scalability.
  
### Authentication Features
* User Accounts:
    * Login and registration pages will be implemented to allow personalized user experiences
    * Secure authentication flow using Firebase Auth or NextAuth.js
