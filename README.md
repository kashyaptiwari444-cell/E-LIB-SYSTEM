# Library Management System — Frontend (React + Vite)

Complete React frontend wired to your existing Express/MongoDB backend.

## Setup

```bash
cd library-frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`. Your backend must be running at `http://localhost:4444`
(change this in `.env` → `VITE_API_URL` if different).

## What's included

| Page | Route | Who |
|---|---|---|
| Login | `/login` | everyone |
| Register | `/register` | everyone |
| Browse & Issue Books | `/books` | student |
| My Issued Books (return + fine) | `/my-books` | student |
| Dashboard (stats) | `/admin/dashboard` | admin |
| Manage Books (add/edit/delete) | `/admin/books` | admin |
| All Rentals (mark returned/delete) | `/admin/rentals` | admin |
| Manage Users (edit role/delete) | `/admin/users` | admin |

Role-based redirects are handled automatically after login (`ProtectedRoute` /
`AdminRoute` in `src/components/`).

## Assumptions made (please verify against your `auth` middleware)

1. **Token header**: every request sends `Authorization: Bearer <token>`
   (set up in `src/api/axios.js`). If your `auth.js` middleware reads the
   token differently (e.g. a custom header or cookie), tell me and I'll
   adjust the interceptor.
2. Token + logged-in user are kept in `localStorage` (standard for a JWT
   SPA — this only applies to your real browser app, not a sandboxed
   preview).
3. Register page lets you pick role (student/admin) since your `/add-user`
   route currently has no restriction on `role` — handy for creating a test
   admin account without touching the DB directly. You may want to lock
   this down later so random visitors can't self-register as admin.

## Book cover image upload

The frontend now sends book add/edit forms as `multipart/form-data` (via
`FormData`, field name `image`) instead of plain JSON, and shows the cover
thumbnail in every table where a book appears (Manage Books, Browse Books,
My Books, All Rentals).

**This needs matching changes on your backend** — see the code I gave you
separately for:
- `middleware/upload.js` (new file, multer config)
- `models/Book.js` (add an `image` field)
- `controllers/bookController.js` (`addBook`/`editBook`/`deleteBook` handle `req.file`)
- `controllers/rentalController.js` (`.populate("book", ...)` needs `image` added to the field list in both `myIssuedBooks` and `getAllRentals`, or the cover won't show up in My Books / All Rentals)
- `routes/book.routes.js` (`upload.single("image")` on the add/edit routes)
- `server.js` (`app.use("/uploads", express.static(...))` to actually serve the saved images)
- `npm install multer` on the backend

Until those are in place, adding/editing books will still work but the
image just won't be saved or displayed.

## Two small things I noticed in the backend (not touched, just flagging)

- `package.json` lists `"moongose"` instead of `"mongoose"` — the actual
  installed package name won't match what your models `require('mongoose')`,
  so `npm install` on the backend needs the correct package name or
  `require('mongoose')` will fail.
- `PUT /rentals/return/:id` and `GET /show-details/:id`, `GET /` (users) etc.
  only require `auth` (any logged-in user), not `adminOnly` or ownership
  checks — so technically any logged-in student could return someone else's
  rental by guessing the ID, or list all users. Not a frontend issue, just
  worth knowing before this goes anywhere near production.
