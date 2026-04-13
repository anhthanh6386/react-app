import React, { useState, useEffect } from 'react';
import exampleApi from '../../api/services/exampleApi';
import ArticleTable from '../../components/ArticleTable';

const AdminArticles = () => {
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

  const handleUpdateArticle = async (updatedArticle) => {
    try {
      // Gọi API mô phỏng cập nhật
      await exampleApi.updatePost(updatedArticle.id, updatedArticle);
      // Cập nhật state
      setPosts(posts.map(post => post.id === updatedArticle.id ? updatedArticle : post));
    } catch (err) {
      alert('Không thể cập nhật bài viết: ' + err.message);
    }
  };

  const handleDeleteArticle = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá bài viết này?')) return;
    try {
      // Gọi API mô phỏng xoá
      await exampleApi.deletePost(id);
      // Cập nhật state
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      alert('Không thể xoá bài viết: ' + err.message);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {error && (
        <div style={{ color: 'var(--danger)', marginBottom: '1rem', background: 'rgba(255, 71, 87, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--danger)' }}>
          ⚠ Lỗi tải danh sách: {error}
        </div>
      )}
      <ArticleTable 
        articles={posts} 
        loading={loading} 
        onUpdate={handleUpdateArticle}
        onDelete={handleDeleteArticle}
      />
    </div>
  );
};

export default AdminArticles;
