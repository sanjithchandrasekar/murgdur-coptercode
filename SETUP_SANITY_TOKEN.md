# Sanity API Token Check & Setup

Since your application needs to **write** user data (for Sign Up) and **read** private user data (for Login/Profile) from Sanity, you must provide an API Token with the correct permissions.

Currently, if you see "Registration Failed" or login issues on other devices, it's because the application cannot securely connect to Sanity.

## Step 1: Generate a Token in Sanity

1.  Go to [Sanity.io/manage](https://www.sanity.io/manage).
2.  Select your project (`luxuria-root` / `murugdur1`).
3.  Go to the **API** tab.
4.  Scroll down to **Tokens** and click **Add API Token**.
5.  **Name**: `Website Auth` (or similar).
6.  **Permissions**: Select **Editor** (read + write).
7.  Click **Save**.
8.  **Copy the token immediately** (you won't see it again).

## Step 2: Add Token to Local Environment (For Development)

1.  Open the file `.env.local` in your project root (`c:\Projects\murugdur1\.env.local`).
2.  Add a new line at the end:
    ```env
    VITE_SANITY_TOKEN=your_copied_token_here
    ```
    *(Replace `your_copied_token_here` with the actual token string starting with `sk...`)*

3.  Restart your local development server:
    ```bash
    npm run dev
    ```

## Step 3: Add Token to Vercel (For Production)

1.  Go to your Vercel Dashboard.
2.  Select your project (`murugdur1`).
3.  Go to **Settings** > **Environment Variables**.
4.  Add a new variable:
    *   **Key**: `VITE_SANITY_TOKEN`
    *   **Value**: Paste your token.
5.  Click **Save**.
6.  Go to **Deployments** and **Redeploy** the latest commit for changes to take effect.

---
**Why is this needed?**
Without this token, the website cannot save new users to the database. It falls back to "Local Mode", saving data only in your browser, which is why you cannot log in from a different device.
