ChatGPT Clone
=============
A ChatGPT clone built with [Next.js](https://nextjs.org/) and [Vercel AI SDK](https://sdk.vercel.ai/docs). 


## Prerequisites
This projects depends on some software and third-party services.

1.  Make sure you already have Node.js and PostgreSQL installed on your machine.

1.  Under the hood, this app will make requests to the [Chat Completions API](https://platform.openai.com/docs/guides/text-generation/chat-completions-api), so you need to get your OpenAI API key.

1.  Currently we are using Github and Google for authentication using OAuth, so you need to to get the OAuth client IDs and client secrets.

1.  You need to have an email server for sending emails e.g: SendGrid.


## Running on development machine
After cloning this repo, follow these steps:

1.  Create a new PostgreSQL database.

1.  Copy the `.env.local_sample` to `.env.local` and fill in all of the values.

1.  Install the dependencies:

        npm install

1.  Run the database migrations:

        npx prisma migrate dev

    Note that the command being used is `npx` instead of `npm`.

1.  Run the development server:

        npm run dev

You can open the app on `http://localhost:8000` using your browser.


## License
MIT
