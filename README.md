ChatGPT Clone
=============
A ChatGPT clone built with [Next.js](https://nextjs.org/) and [Vercel AI SDK](https://sdk.vercel.ai/docs). 


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
