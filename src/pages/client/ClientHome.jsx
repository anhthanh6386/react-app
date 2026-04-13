import React, { useState, useEffect } from 'react';
import exampleApi from '../../api/services/exampleApi';

const ClientHome = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await exampleApi.getAllPosts();
      setPosts(response);
    } catch (err) {
      setError(err.message || 'Lấy danh sách thất bại');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '3rem', color: 'var(--light-text-p)', marginBottom: '16px', fontWeight: 800 }}>
          Trải nghiệm nội dung <br />
          <span style={{ 
            background: 'linear-gradient(135deg, var(--accent-primary), #06b6d4)', 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>đỉnh cao</span>.
        </h2>
        <p style={{ color: 'var(--light-text-s)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Khám phá những góc nhìn mới và các câu chuyện truyền cảm hứng từ hàng ngàn tác giả trong cộng đồng của chúng tôi.
        </p>
      </div>

      {error && (
        <div style={{ backgroundColor: '#FEF2F2', borderLeft: '4px solid var(--danger)', padding: '16px', color: '#991B1B', borderRadius: '8px', marginBottom: '24px' }}>
          ⚠ Thật tiếc, đã có lỗi xảy ra: {error}
        </div>
      )}
      
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
          <div style={{
            width: '40px', height: '40px', 
            border: '4px solid rgba(79, 70, 229, 0.2)',
            borderTop: '4px solid var(--accent-primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          {posts.map((post, index) => (
            <div key={`client-${post.id}`} 
              className="animate-fade-in"
              style={{
              animationDelay: `${index * 50}ms`,
              background: 'var(--light-surface)',
              borderRadius: '16px',
              border: '1px solid var(--light-border)',
              padding: '32px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              e.currentTarget.style.borderColor = 'rgba(79, 70, 229, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'var(--light-border)';
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: 'rgba(79, 70, 229, 0.1)', color: 'var(--accent-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px', fontWeight: 'bold'
              }}>
                {(post.title || 'A').charAt(0).toUpperCase()}
              </div>
              <h3 style={{ margin: '0 0 12px 0', color: 'var(--light-text-p)', fontSize: '1.25rem', lineHeight: '1.5' }}>
                {post.title}
              </h3>
              <p style={{ color: 'var(--light-text-s)', lineHeight: '1.6', margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>
                {post.body}
              </p>
              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--light-border)', color: 'var(--accent-primary)', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Đọc bài viết <span style={{ transition: 'transform 0.2s' }}>&rarr;</span>
              </div>
            </div>
          ))}
          {posts.length === 0 && <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: 'var(--light-text-s)' }}>Chưa có bài viết nào.</p>}
        </div>
      )}
    </div>
  );
};

export default ClientHome;
