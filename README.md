# Webshop AI Agent


There are two branches:

- `main`: blank webshop, ready to implement AI features
- `complete`: all AI features implemented

## Getting Started

```
cd webshop-ai-agent
npm install
npm run dev
```

### Env
This project supports two env variables in a `.env` file in the root of the project:
- `PORT`: the local port on which the dev server will listen (optional)
- `VITE_GOOGLE_GENERATIVE_AI_API_KEY`: the API_KEY for the Google Generative AI Studio [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)

## Setup
```
- public      // public assets (mainly images)
- src         // main application logic
- - app       // layout components
- - store     // react context provider, data
- - theme     // UI components with limited logic
- - utils     // utility functions (some will be relevant later in the workshop)
- - App.tsx   // main App
- - index.css // set up tailwindcss
- - main.tsx  // main entry-point
- index.html  // set up vite
```

## Dependencies

**Webshop AI Agent** is a [React](https://react.dev/) Application that uses [tailwindcss](https://tailwindcss.com/) for styling.

### Key dependencies
*   **[React](https://react.dev/)**: For building the user interface.
*   **[React Router](https://reactrouter.com/)**: For client-side navigation.
*   **[Headless UI](https://headlessui.com/)**: For accessible UI components.
*   **[Heroicons](https://heroicons.com/)**: For icons.
*   **[Tailwind CSS](https://tailwindcss.com/)**: For rapid UI development and styling.
*   **[Nuqs](https://nuqs.vercel.app/)**: For managing URL query parameters.
*   **[Showdown](https://showdownjs.com/)**: For converting Markdown to HTML.

### Build process
*   **[Vite](https://vitejs.dev/)**: For fast development and building.

### AI Tasks
*   **[WebLLM](https://mlc.ai/web-llm/)**: For integrating large language models.
*   **[Hugging Face Transformers](https://huggingface.co/docs/transformers/index)**: For natural language processing (feature-extraction).
*   **[AI SDK Google](https://ai.google.dev/)**: For interacting with Google's AI services.
*   **[AI](https://sdk.vercel.ai/docs)**: For building AI-powered features.

### Developer Experience
*   **[Zod](https://zod.dev/)**: For data validation and type safety, especially for structured output of AI models
*   **[TypeScript](https://www.typescriptlang.org/)**: For static typing.
*   **[ESLint](https://eslint.org/)**: For code quality.
*   **[Prettier](https://prettier.io/)**: For code formatting.