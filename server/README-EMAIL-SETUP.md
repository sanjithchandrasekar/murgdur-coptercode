# How to Configure Email for OTP

To make the "Get OTP" button work and send real emails to users, you need to configure your "Sender" email account. We will use **Gmail** for this example.

## Step 1: Prepare your Google Account
1.  Go to your **[Google Account Security Page](https://myaccount.google.com/security)**.
2.  Scroll down to the **"How you sign in to Google"** section.
3.  **Turn ON "2-Step Verification"** if it is not already on. (This is required).

## Step 2: Generate an App Password
*Google does not allow you to use your regular password for safety. You must generate a special "App Password".*

1.  In the same **Security** page, search for **"App Passwords"** in the top search bar (or look under "2-Step Verification").
2.  Click to create a new app password.
3.  **App name**: Enter "Murgdur Website" (or any name you like).
4.  Click **Create**.
5.  Google will show you a **16-character code** (it looks like `abcd efgh ijkl mnop`).
6.  **COPY this code.** You will not see it again.

## Step 3: Update your Project Configuration
1.  Open the file: `c:\Projects\murugdur1\server\.env`
2.  Find these lines at the bottom:

```env
SMTP_USER=YOUR_GMAIL_ADDRESS_HERE
SMTP_PASS=YOUR_16_DIGIT_APP_PASSWORD_HERE
```

3.  Replace `YOUR_GMAIL_ADDRESS_HERE` with your **actual Gmail address** (e.g., `sanjith@gmail.com`).
4.  Replace `YOUR_16_DIGIT_APP_PASSWORD_HERE` with the **16-character code** you just copied (remove any spaces if you want, but usually spaces are fine).

## Step 4: Restart Server
1.  Stop your running server (Ctrl+C in the terminal).
2.  Run `npm run dev` again.

## Step 5: Test
1.  Go to your website Sign Up page.
2.  Enter a valid email address (it can be the same one or a different one).
3.  Click **GET OTP**.
4.  Check the inbox of the email you entered. The code should arrive within seconds!
