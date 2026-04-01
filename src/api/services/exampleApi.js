import axiosClient from '../axiosClient';

// Định nghĩa Object chứa toàn bộ các hàm gọi API liên quan tới Example (Ví dụ: bài viết/post)
const exampleApi = {
  // Lấy danh sách posts
  getAllPosts: () => {
    const url = '/posts';
    // Do interceptor đã cấu hình tự trả về response.data, ta chỉ cần return `axiosClient.get(url)`
    // Gửi thêm params thì truyền theo dạng config object: { params: { _limit: 10 } }
    return axiosClient.get(url); 
  },
  
  // Lấy chi tiết một post theo ID
  getPostById: (id) => {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  },

  // Tạo mới một post
  createPost: (data) => {
    const url = '/posts';
    return axiosClient.post(url, data);
  },

  // Cập nhật post
  updatePost: (id, data) => {
    const url = `/posts/${id}`;
    return axiosClient.put(url, data);
  },

  // Xóa post
  deletePost: (id) => {
    const url = `/posts/${id}`;
    return axiosClient.delete(url);
  }
};

export default exampleApi;
