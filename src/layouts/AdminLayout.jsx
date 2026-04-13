import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-container">
      {/* Menu Bar (Sidebar) */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          <NavLink 
            to="/admin" 
            end
            className={({ isActive }) => (isActive ? 'admin-nav-link active' : 'admin-nav-link')}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/admin/articles" 
            className={({ isActive }) => (isActive ? 'admin-nav-link active' : 'admin-nav-link')}
          >
            Quản lý Bài viết
          </NavLink>
          <NavLink 
            to="/" 
            className="admin-nav-link back-to-client"
          >
            Trở về Client
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-header-title">
            Hệ thống Quản trị v1.0
          </div>
          <div className="admin-header-user">
            <span>Admin, Chào mừng!</span>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="admin-content">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="admin-footer">
          <p>&copy; {new Date().getFullYear()} - Admin Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
