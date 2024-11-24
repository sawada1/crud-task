# crud-task

This template should help get you started developing with Vue 3 in Vite.

## Description

This project is a Trello-like task management application built using modern web technologies, including Vue.js, TypeScript, and Pinia for state management. The application enables users to manage tasks through CRUD (Create, Read, Update, Delete) operations across multiple columns, with a drag-and-drop interface for seamless task movement. 

The project leverages PrimeVue for UI components and Tailwind CSS for responsive and modern styling.

## Features

- **Task Management**: Add, edit, delete, and move tasks across customizable columns.
- **Drag-and-Drop Interface**: Intuitive task organization using drag-and-drop functionality.
- **Dynamic State Management**: Real-time updates using Pinia for efficient state handling.
- **Column Categories**: Categorize tasks into predefined statuses (e.g., Ready, Review, Complete).
- **Modern UI Design**: Tailored with Tailwind CSS for a responsive and visually appealing interface.
- **Reusable Components**: Modular design with reusable Vue components.

## Technologies Used

- **Framework**: Vue.js (Composition API)
- **Language**: TypeScript
- **State Management**: Pinia
- **UI Library**: PrimeVue
- **Styling**: Tailwind CSS
- **Task Management Features**: CRUD operations, drag-and-drop functionality



## Recommended IDE Setup
[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup
Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
