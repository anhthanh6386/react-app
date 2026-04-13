import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const ClientLayout = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Client Header */}
      <header className="header" style={{ marginBottom: 0, borderRadius: 0 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Awesome Blog</h1>
            <p style={{ margin: '5px 0 0', opacity: 0.8 }}>Nơi chia sẻ kiến thức</p>
          </div>
          <nav>
            <Link to="/admin" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', padding: '10px 20px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px' }}>
              Đăng nhập Admin
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '40px 20px', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: '#2c3e50', color: 'white', textAlign: 'center', padding: '20px' }}>
        <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Awesome Blog. Built for the community.</p>
      </footer>
    </div>
  );
};

export default ClientLayout;
