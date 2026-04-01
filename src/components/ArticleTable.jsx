import { useState } from 'react';
import './ArticleTable.css';

export default function ArticleTable({ articles = [], loading = false }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(articles.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = articles.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="glass-panel table-container">
      <div className="table-header-custom">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--accent-color)'}}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Danh sách bài viết
        </h2>
        <span className="badge-total">Tổng: {articles.length} bài</span>
      </div>
      
      <div className="table-responsive">
        <table className="custom-table" style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ width: '80px' }}>ID</th>
              <th style={{ width: '30%' }}>Tiêu đề</th>
              <th style={{ width: '35%' }}>Nội dung tóm tắt</th>
              <th style={{ width: '10%' }}>Tác giả</th>
              <th style={{ textAlign: 'right', width: '15%' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '4rem', color: 'var(--accent-hover)' }}>
                  <div className="loading-pulse" style={{ fontSize: '1.1rem' }}>⟳ Đang tải dữ liệu từ Database...</div>
                </td>
              </tr>
            ) : currentArticles.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                  Chưa có dữ liệu bài viết nào.
                </td>
              </tr>
            ) : (
              currentArticles.map(article => (
                <tr key={article.id}>
                  <td style={{ color: 'var(--text-secondary)' }}>#{article.id}</td>
                  <td className="table-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{article.title}</td>
                  <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-secondary)' }}>{article.body}</td>
                  <td>User {article.userId}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn-action btn-edit">Sửa</button>
                    <button className="btn-action btn-delete">Xoá</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="page-btn"
          >
            Trước
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
            if (page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)) {
              return (
                <button 
                  key={page} 
                  onClick={() => handlePageChange(page)}
                  className={`page-btn ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              );
            } else if (page === currentPage - 3 || page === currentPage + 3) {
              return <span key={page} style={{ alignSelf: 'center', color: 'var(--text-secondary)' }}>...</span>;
            }
            return null;
          })}

          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="page-btn"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}
