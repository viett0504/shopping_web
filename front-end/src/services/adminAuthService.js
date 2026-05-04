import { delay } from '../utils/delay';
import { mockAdminUser } from './mockData';

export const adminAuthService = {
  async login(email, password) {
    await delay(500);
    
    // Mock validation
    if (email === 'admin@gmail.com' && password === '123456') {
      const accessToken = 'mock_jwt_token_' + Date.now();
      return {
        accessToken,
        user: mockAdminUser,
      };
    }
    
    throw new Error('Sai email hoặc mật khẩu');
  },

  async getMe() {
    await delay(300);
    return mockAdminUser;
  },
};
