# Step-by-Step Deployment Guide: Making Your Website Live 24/7

To make your website "full-fledged" and running constantly even when your computer is off, you need to deploy it to the cloud. We will use **Vercel** for hosting the website and **MongoDB Atlas** for your database.

## 1. Configure MongoDB Database (CRITICAL)
Your database is currently secured to only allow connections from *your* computer. You must open it to the cloud so Vercel can connect.

1.  Log in to [MongoDB Atlas](https://account.mongodb.com/account/login).
2.  Go to **Network Access** in the left sidebar (under Security).
3.  Click the green **+ Add IP Address** button.
4.  Select **Allow Access from Anywhere** (This sets the IP to `0.0.0.0/0`).
5.  Click **Confirm**.
    *   *Note: This allows the cloud server to reach your database.*

## 2. Push Your Code to GitHub
Your code needs to be on GitHub so Vercel can access it.

1.  Open your **Source Control** tab in VS Code (the branch icon on the left).
2.  Write a message in the input box (e.g., "Ready for deployment").
3.  Click **Commit**.
4.  Click **Sync Changes** or **Push** to send the code to your GitHub repository.

## 3. Deploy to Vercel
Now we connect your GitHub repository to Vercel to build the site.

1.  Go to [Vercel.com](https://vercel.com/login) and log in with your GitHub account.
2.  Click **Add New...** -> **Project**.
3.  Find your repository (`murugdur-website-2` or similar) and click **Import**.

## 4. Set Environment Variables (IMPORTANT)
Vercel needs to know your secret keys (like database passwords) because it cannot read your local `.env` file for security reasons.

In the **Configure Project** screen on Vercel, expand the **Environment Variables** section and add these:

| Key | Value |
| :--- | :--- |
| `MONGODB_URI` | `mongodb+srv://sanjithchandrasekar03_db:sanjithkongu44@cluster0.gvi5jmk.mongodb.net/luxuria?appName=Cluster0` |
| `JWT_SECRET` | `royal_secret_key_12345` |
| `VITE_SANITY_TOKEN` | *Copy from your client/.env file (starts with `skhK...`)* |
| `VITE_PROJECT_ID` | `lpx1306g` (Your Sanity Project ID) |
| `VITE_DATASET` | `production` |

*Note: You can find these values in your local `.env` files.*

## 5. Deploy
1.  Click **Deploy**.
2.  Wait for the build to complete (about 1-2 minutes).
3.  Once finished, click the screenshot of your website to visit your live URL (e.g., `https://murugdur-website.vercel.app`).

## 6. Verify Connection
1.  On your live website, trying logging in or signing up.
2.  Go to `https://your-website-url.vercel.app/sanity-test` to see the "System Diagnostics" page. It should show a green checkmark for MongoDB Connection.

---

### Troubleshooting
- **"Database not connected"**: Did you do Step 1 (Network Access)? Vercel servers change IPs, so you MUST allow `0.0.0.0/0`.
- **"500 Server Error"**: Did you add the `MONGODB_URI` environment variable in Vercel?
