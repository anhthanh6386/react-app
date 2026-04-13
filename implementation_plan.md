# Refactor React App for Admin and Client Areas

This implementation plan outlines the steps required to separate the React application into distinct "Admin" and "Client" (public) sections.

## User Review Required

> [!IMPORTANT]
> This refactor will introduce routing using `react-router-dom`. The current single-page state-based tab layout will be replaced by URL-based routing. Please review the proposed routing structure below.

## Proposed Changes

We will separate the current combined application into layouts and pages, adding navigation and routing.

### 1. Dependencies Setup
- Add `react-router-dom` to `package.json` for managing application routes.

### 2. Application Routing (src)
- Modify `App.jsx` to use a `BrowserRouter` and define routes for the two areas.

#### [MODIFY] [App.jsx](file:///c:/Users/MinhLT/.gemini/antigravity/scratch/react-app/src/App.jsx)

### 3. Layouts (src/layouts)
Create two distinct layouts. `AdminLayout` will have the requested comprehensive structure.

#### [NEW] [AdminLayout.jsx](file:///c:/Users/MinhLT/.gemini/antigravity/scratch/react-app/src/layouts/AdminLayout.jsx)
- Will contain: Sidebar Menu (Menu bar), Top Header, Main Content area (`Outlet`), and a Footer.

#### [NEW] [ClientLayout.jsx](file:///c:/Users/MinhLT/.gemini/antigravity/scratch/react-app/src/layouts/ClientLayout.jsx)
- A simple public-facing layout with a Header and Main Content area.

#### [NEW] [AdminLayout.css](file:///c:/Users/MinhLT/.gemini/antigravity/scratch/react-app/src/layouts/AdminLayout.css)
- CSS for the Admin layout structure (CSS grid for sidebar and main content).

### 4. Pages (src/pages)
Move the existing logic from `App.jsx` into specific page components.

#### [NEW] [AdminDashboard.jsx](file:///c:/Users/MinhLT/.gemini/antigravity/scratch/react-app/src/pages/admin/AdminDashboard.jsx)
- Move the current post creation form and simple list to this page.

#### [NEW] [AdminArticles.jsx](file:///c:/Users/MinhLT/.gemini/antigravity/scratch/react-app/src/pages/admin/AdminArticles.jsx)
- Move the `ArticleTable` component rendering to this dedicated page.

#### [NEW] [ClientHome.jsx](file:///c:/Users/MinhLT/.gemini/antigravity/scratch/react-app/src/pages/client/ClientHome.jsx)
- A basic page to display articles to regular visitors (read-only list).

## Route Structure
- `/` -> `ClientLayout`
  - `/` -> `ClientHome`
- `/admin` -> `AdminLayout`
  - `/admin` -> `AdminDashboard`
  - `/admin/articles` -> `AdminArticles`

## Open Questions

> [!NOTE]
> 1. Should the Client area use exactly the same styling as the dashboard, or should we create a simplified public look? (I will assume a simplified responsive list for the Client for now).
> 2. Is there any specific branding, colors or logo you want on the Admin Header/Sidebar?

## Verification Plan

### Manual Verification
1. Run `npm run dev` and navigate to `http://localhost:5173/`. Ensure the client layout renders.
2. Navigate to `http://localhost:5173/admin` and verify the Admin layout with the Sidebar, Header, and Footer appears.
3. Test navigation between Dashboard and Article List within the Admin area.
4. Ensure data fetching, creating, updating, and deleting still function properly in the new components.
