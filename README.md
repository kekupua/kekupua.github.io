# App

## Overview

This project is a web application built using [Vite](https://vitejs.dev/), a fast front-end build tool. It provides a streamlined and fast development experience for modern JavaScript frameworks like React, Vue, or vanilla JavaScript.

## Features

- **Vite**: Fast and efficient bundling and development server.
- **React**: (If applicable) Vite is used here with React to power the UI.
- **React Router**: Handles client-side routing for a seamless single-page application experience.

## Getting Started

To get started with this Vite app, follow the steps below.

### Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/download/) (v20+)
- npm (comes with Node.js) or Yarn

### Installation

Clone the repository:

```bash
git clone https://github.com/kekupua/kekupua.github.io.git
```

Install pnpm (if necessary):

```bash
npm -g pnpm@latest
```

Install the dependencies:

```bash
pnpm install
```

### Development

Run the local development server:

```bash
pnpm --filter portfolio dev
```

The app will be available at `http://localhost:3000`.

### Building for Production

To create a production build, run the following command:

```bash
pnpm --filter portfolio build
```

The production-ready files will be output to the `packages/portfolio/dist` directory.

### Previewing Production Build

You can preview the production build with this command:

```bash
pnpm --filter portfolio preview
```

This will serve the content from the `dist` folder.

### Testing

```bash
NYI
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
