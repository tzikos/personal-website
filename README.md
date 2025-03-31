# My personal website

## Project info

# Step 1: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 2: Install the necessary dependencies.
npm i

# Step 3: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Go to [Render](https://render.com) and create a new project.

Then make sure you specify the following:

```
# Build command
npm i && npm run build

# Deploy command
npm run preview
```

## What environment variables are required?

Make sure you have a .env file in your project folder with the following:
```
VITE_SUPABASE_URL=<YOUR_VITE_SUPABASE_URL>
VITE_SUPABASE_ANON_KEY=<YOUR_VITE_SUPABASE_ANON_KEY>
```
> Only needed if you want the contact form to send data to your Supabase instance.

## Comments

Initial template was provided by lovable.dev, modifications were added by me afterwards.