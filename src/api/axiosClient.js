import axios from 'axios';

// Khởi tạo instance của Axios với các cấu hình mặc định
const axiosClient = axios.create({
  // Tạm sử dụng jsonplaceholder để test. Khi có API thật, bạn có thể thay đổi, 
  // hoặc dùng process.env.VITE_API_BASE_URL (trong Vite dùng import.meta.env.VITE_API_BASE_URL)
  baseURL: 'http://localhost:8080', // Thay đổi URL này khi có API thật
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor cho trường hợp Request (Gửi đi)
axiosClient.interceptors.request.use(
  (config) => {
    // Làm gì đó trước khi request gửi đi. (Ví dụ: thêm Token)
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // Xử lý lỗi khi gửi request
    return Promise.reject(error);
  }
);

// Interceptor cho trường hợp Response (Nhận về)
axiosClient.interceptors.response.use(
  (response) => {
    // Xử lý dữ liệu trả về thành công
    // Thông thường API có định dạng chung như response.data, nên ta chỉ lấy phần cần thiết
    return response.data;
  },
  (error) => {
    // Xử lý lỗi trả về chung toàn hệ thống
    if (error.response && error.response.status === 401) {
      // Ví dụ: Bị lỗi Token hết hạn -> Điều hướng về mãng đăng nhập
      console.error('Lỗi 401: Token hết hạn hoặc không hợp lệ.');
    } else {
      console.error('Lỗi gọi API:', error);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
