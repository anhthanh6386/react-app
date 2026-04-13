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
    <div>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '10px' }}>Bài Viết Mới Nhất</h2>
        <p style={{ color: '#7f8c8d', fontSize: '1.2rem' }}>Khám phá những nội dung thú vị từ cộng đồng.</p>
      </div>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>⚠ Lỗi: {error}</p>}
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Đang tải dữ liệu...</div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {posts.map(post => (
            <div key={`client-${post.id}`} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
            }}>
              <h3 style={{ margin: '0 0 12px 0', color: '#34495e', fontSize: '1.4rem', lineHeight: '1.4' }}>
                {post.title}
              </h3>
              <p style={{ color: '#7f8c8d', lineHeight: '1.6', margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {post.body}
              </p>
              <div style={{ marginTop: '20px', color: '#3498db', fontWeight: 'bold', fontSize: '0.9rem' }}>
                Đọc tiếp &rarr;
              </div>
            </div>
          ))}
          {posts.length === 0 && <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Chưa có bài viết nào.</p>}
        </div>
      )}
    </div>
  );
};

export default ClientHome;
