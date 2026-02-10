# LUXURIA - Royal E-commerce Platform

A premium e-commerce application powered by React (Vite) and Sanity CMS.

## 🚀 Key Features

*   **Royal Design**: Fully custom UI with animations and consistent branding.
*   **Database**: **Sanity CMS** acts as the primary database (like MongoDB/NoSQL) causing user data and product information to be synced across all devices.
*   **Authentication**: Users can Sign Up and Login. Accounts are stored in the `customer` schema in Sanity.
*   **E-commerce**: Product catalog, cart, and profile management.

## 📱 Database & User Sync

The application uses **Sanity** as its backend database for user profiles. This allows:
1.  **Cross-Device Login**: A user can sign up on a laptop and log in on their mobile phone.
2.  **Persistent Profile**: Address and order history (coming soon) are stored in the cloud.

> **Crucial Setup Step:**
> For **Sign Up** to work on Vercel (Production), you MUST add the `VITE_SANITY_TOKEN` environment variable. Without this token, the app cannot write new users to the database, and registration will fallback to "Local Mode" (this device only).

## 🛠 Project Structure

*   `client/`: The React Frontend (Vite).
*   `luxuria-studio/`: The Sanity CMS configurations and schemas.
*   `server/`: (Legacy) Express server code, largely replaced by Sanity backend.

## 📦 Deployment Instructions (Vercel)

To run this application on Vercel with full database functionality:

1.  **Push Code**: Ensure your latest changes are pushed to GitHub/GitLab.
2.  **Configure Vercel**:
    *   Go to your Vercel Project Settings > Environment Variables.
    *   Add **Key**: `VITE_SANITY_TOKEN`
    *   Add **Value**: (Your Sanity "Write" Token).
3.  **Deploy**: Vercel will automatically build the `client` folder.

### Verification of Sanity Database
*   Open your deployed URL.
*   Create a new account.
*   **Check Sanity Studio**: Go to your local studio (`cd luxuria-studio && npm run dev`) or deployed studio.
*   Look for the `Customer` document type. You should see the new user entry there.
*   **Test Cross-Device**: Open an Incognito window and try to log in with the same credentials. It should work!

## 📜 Commands

*   `npm run dev`: Starts both Client and Server (though server is optional now).
*   `npm run build`: Builds the client for production.
