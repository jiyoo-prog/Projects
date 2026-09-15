# KHN Futuristic Portfolio

A ready-to-preview portfolio website for a **Video Editor / Graphic Designer**.

## Included

- Futuristic responsive landing page
- Portfolio category filters
- Project popup previews
- Video / image project support
- Admin dashboard
- Add, edit and delete projects
- Image file upload for local preview
- Mobile navigation
- Smooth reveal animations
- Firebase-ready config file

## Quick Start in VS Code

1. Extract/open the folder `khn-futuristic-portfolio`.
2. In VS Code, install the **Live Server** extension if you do not already have it.
3. Right-click `index.html`.
4. Choose **Open with Live Server**.
5. To manage your work, click **Admin** in the top navigation.

You can also open `index.html` directly in a browser, but Live Server is recommended.

## How the Admin Preview Works

The included admin uses browser `localStorage` so it works immediately without setting up a database.

- Adding/deleting/editing projects updates the main portfolio.
- Uploaded images are stored inside your current browser's local storage.
- This is only intended for preview/testing.
- If you clear browser storage or open the site in another browser/device, those local changes will not be there.
- Large image/video files should NOT be stored in localStorage.

## Add a Project

Open `admin.html` and complete:

- Project title
- Category
- Description
- Media type
- Upload image OR paste a media URL

Then click **Add Project**.

## Real Deployment With Cloud Uploads

For a public production website, use:

- Firebase Authentication for admin login
- Cloud Firestore for project information
- Firebase Storage for image/video uploads

A placeholder config is included in:

`js/firebase-config.js`

Create a Firebase project and replace the placeholder values.

## Recommended Deployment

This static site can be hosted using:

- Firebase Hosting
- Netlify
- Vercel
- GitHub Pages

For the current localStorage demo, any static host works. For secure uploads and admin authentication, connect Firebase first.

## Customize

### Your email
In `index.html`, replace:

`your-email@example.com`

### Facebook link
Find:

`<a class="btn btn-ghost" href="#">Facebook</a>`

and replace `#` with your Facebook page/profile URL.

### Name / branding
Search the project for `KHN PRODUCTION` and replace it with your preferred portfolio name.

## Project Structure

```text
khn-futuristic-portfolio/
├── index.html
├── admin.html
├── README.md
├── css/
│   ├── style.css
│   └── admin.css
├── js/
│   ├── data.js
│   ├── app.js
│   ├── admin.js
│   └── firebase-config.js
└── assets/
    └── images/
```

## Note

The sample project images are loaded from Unsplash URLs, so an internet connection is needed to display them. Replace them with your own work from the Admin page.
