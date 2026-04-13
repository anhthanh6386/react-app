import { useState, useEffect, useMemo } from 'react';
import './ArticleTable.css';

const PAGE_SIZE_OPTIONS = [5, 8, 10, 15, 20];

export default function ArticleTable({ articles = [], loading = false, onUpdate, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: '', body: '' });

  const totalPages =
    articles.length === 0 ? 0 : Math.ceil(articles.length / itemsPerPage);

  useEffect(() => {
    if (articles.length === 0) {
      setCurrentPage(1);
      return;
    }
    const maxPage = Math.ceil(articles.length / itemsPerPage) || 1;
    setCurrentPage((p) => Math.min(p, maxPage));
  }, [articles.length, itemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = articles.slice(startIndex, startIndex + itemsPerPage);

  const rangeLabel = useMemo(() => {
    if (articles.length === 0) return '';
    const from = startIndex + 1;
    const to = Math.min(startIndex + itemsPerPage, articles.length);
    return `Hiển thị ${from}–${to} / ${articles.length} bài`;
  }, [articles.length, startIndex, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleEditClick = (article) => {
    setEditingArticle(article);
    setEditFormData({ title: article.title, body: article.body });
    setShowEditModal(true);
  };

  const handleCancelClick = () => {
    setShowEditModal(false);
    setEditingArticle(null);
  };

  const handleSaveClick = (e) => {
    if (e) e.preventDefault();
    if (onUpdate && editingArticle) {
      onUpdate({ ...editingArticle, ...editFormData });
    }
    setShowEditModal(false);
    setEditingArticle(null);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
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
              <th style={{ width: '5%', textAlign: 'left' }}>ID</th>
              <th style={{ width: '30%', textAlign: 'left' }}>Tiêu đề</th>
              <th style={{ width: '40%', textAlign: 'left' }}>Nội dung tóm tắt</th>
              <th style={{ width: '10%', textAlign: 'left' }}>Tác giả</th>
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
                  <td style={{ color: 'var(--light-text-s)' }}>#{article.id}</td>
                  <td className="table-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{article.title}</td>
                  <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--light-text-s)' }}>{article.body}</td>
                  <td>User {article.userId}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn-action btn-edit" onClick={() => handleEditClick(article)}>Sửa</button>
                    <button className="btn-action btn-delete" onClick={() => onDelete && onDelete(article.id)}>Xoá</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && articles.length > 0 && (
        <div className="pagination-section">
          <div className="pagination-toolbar">
            <span className="pagination-range">{rangeLabel}</span>
            <label className="pagination-page-size">
              <span>Số bài / trang</span>
              <select
                className="pagination-select"
                value={itemsPerPage}
                onChange={handlePageSizeChange}
                aria-label="Số bài viết mỗi trang"
              >
                {PAGE_SIZE_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="pagination">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="page-btn"
            >
              Trước
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2)
              ) {
                return (
                  <button
                    type="button"
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`page-btn ${currentPage === page ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                );
              }
              if (page === currentPage - 3 || page === currentPage + 3) {
                return (
                  <span
                    key={`ellipsis-${page}`}
                    className="pagination-ellipsis"
                    aria-hidden
                  >
                    …
                  </span>
                );
              }
              return null;
            })}

            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="page-btn"
            >
              Sau
            </button>
            <span className="pagination-page-hint">
              Trang {currentPage} / {totalPages}
            </span>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={handleCancelClick}>
          <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Chỉnh sửa bài viết #{editingArticle?.id}</h3>
              <button className="close-btn" onClick={handleCancelClick}>&times;</button>
            </div>
            <form onSubmit={handleSaveClick} className="modal-form">
              <div className="form-group">
                <label>Tiêu đề</label>
                <input 
                  type="text" 
                  name="title"
                  value={editFormData.title} 
                  onChange={handleEditChange}
                  className="modal-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Nội dung</label>
                <textarea 
                  name="body"
                  value={editFormData.body} 
                  onChange={handleEditChange}
                  className="modal-input"
                  rows="6"
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={handleCancelClick}>Huỷ</button>
                <button type="submit" className="btn-primary">Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
