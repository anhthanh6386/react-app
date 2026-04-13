import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const ClientLayout = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--light-bg)', color: 'var(--light-text-p)' }}>
      {/* Client Header */}
      <header style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--light-border)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        padding: '16px 24px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '10px', 
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)'
            }}>
              A
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--light-text-p)', letterSpacing: '-0.5px' }}>AwesomeBlog</h1>
            </div>
          </Link>
          <nav>
            <Link to="/admin" style={{ 
              color: 'var(--accent-primary)', 
              textDecoration: 'none', 
              fontWeight: '600', 
              padding: '10px 20px', 
              borderRadius: '8px',
              border: '2px solid var(--accent-primary)',
              transition: 'all 0.2s',
              fontSize: '0.95rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--accent-primary)';
            }}
            >
              Khu Vực Quản Trị
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '60px 24px', position: 'relative' }}>
        {/* Subtle background decoration */}
        <div style={{
          position: 'absolute', top: '-10%', left: '-5%', width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 70%)',
          borderRadius: '50%', zIndex: 0, pointerEvents: 'none'
        }}></div>
        <div style={{
          position: 'absolute', top: '20%', right: '-5%', width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.05) 0%, transparent 70%)',
          borderRadius: '50%', zIndex: 0, pointerEvents: 'none'
        }}></div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: 'var(--light-surface)', 
        borderTop: '1px solid var(--light-border)',
        color: 'var(--light-text-s)', 
        textAlign: 'center', 
        padding: '30px 24px',
        fontSize: '0.9rem'
      }}>
        <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} AwesomeBlog. Tinh tế & Sang trọng.</p>
      </footer>
    </div>
  );
};

export default ClientLayout;
