import { delay } from '../utils/delay';

// Mock authentication service
export const authService = {
  async login(email, password) {
    await delay(500);
    
    // Mock validation
    if (email === 'user@gmail.com' && password === 'user123') {
      return {
        id: 1,
        name: 'Nguyễn Văn A',
        email: 'user@gmail.com',
        phone: '0987654321',
        address: 'Số 123, Đường ABC, Quận XYZ, Hà Nội',
        avatar: null,
        createdAt: '2024-01-01T00:00:00Z',
      };
    }
    
    throw new Error('Email hoặc mật khẩu không đúng');
  },

  async register(data) {
    await delay(500);
    
    // Mock registration
    return {
      id: Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      address: '',
      avatar: null,
      createdAt: new Date().toISOString(),
    };
  },

  async updateProfile(userId, data) {
    await delay(500);
    return data;
  },

  async changePassword(userId, oldPassword, newPassword) {
    await delay(500);
    return true;
  },
};
