import React, { useState, useEffect } from 'react';
import exampleApi from '../../api/services/exampleApi';
import '../../App.css'; // Assuming some shared styles are still in App.css

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({ title: '', body: '' });
  const [submitting, setSubmitting] = useState(false);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.body.trim()) return;

    setSubmitting(true);
    try {
      const response = await exampleApi.createPost({
        title: formData.title,
        body: formData.body,
        userId: 1,
      });

      const newPost = { ...response, id: response.id || Date.now(), isNew: true };
      setPosts([newPost, ...posts]);
      setFormData({ title: '', body: '' });
    } catch (err) {
      alert('Không thể tạo bài viết: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="content-grid" style={{ marginTop: 0 }}>
        {/* Cột trái: Form tạo dữ liệu */}
        <section className="glass-panel">
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>✨ Tạo bài viết mới</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Tiêu đề bài viết</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                className="input-field" 
                placeholder="Nhập tiêu đề ở đây..." 
                value={formData.title}
                onChange={handleChange}
                disabled={submitting}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="body">Nội dung chi tiết</label>
              <textarea 
                id="body" 
                name="body" 
                className="input-field" 
                placeholder="Chia sẻ suy nghĩ của bạn..."
                value={formData.body}
                onChange={handleChange}
                disabled={submitting}
              ></textarea>
            </div>

            <button type="submit" style={{ width: '100%' }} disabled={submitting || !formData.title || !formData.body}>
              {submitting ? 'Đang gửi...' : 'Gửi Bài Viết'}
            </button>
          </form>
        </section>

        {/* Cột phải: Danh sách dữ liệu */}
        <section className="glass-panel">
          <div className="posts-header">
            <h2>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--accent-primary)', marginRight: '8px', verticalAlign: 'text-bottom'}}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Dòng Trạng Thái Gần Đây
            </h2>
            <button onClick={fetchPosts} disabled={loading} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              {loading ? 'Đang làm mới...' : 'Làm mới'}
            </button>
          </div>

          {error && <p style={{ color: 'var(--danger)', marginBottom: '1rem' }}>⚠ Lỗi: {error}</p>}
          
          {loading && posts.length === 0 ? (
            <p className="loading-pulse">Đang tải dữ liệu từ máy chủ...</p>
          ) : (
            <div className="posts-grid" style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: '10px' }}>
              {posts.map(post => (
                <div className="post-card" key={`dash-${post.id}`}>
                  <h3 className="post-title">
                    {post.title} 
                    {post.isNew && <span className="badge-new" style={{ marginLeft: '8px' }}>MỚI</span>}
                  </h3>
                  <p className="post-body">{post.body}</p>
                </div>
              ))}
              {posts.length === 0 && !loading && <p>Chưa có dữ liệu nào để hiển thị.</p>}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
