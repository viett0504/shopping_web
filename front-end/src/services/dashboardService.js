import { delay } from '../utils/delay';
import { mockProducts, mockCategories, mockOrders } from './mockData';

export const dashboardService = {
  async getStats() {
    await delay(500);
    
    const pendingOrders = mockOrders.filter(o => o.orderStatus === 'pending').length;
    const estimatedRevenue = mockOrders
      .filter(o => o.orderStatus !== 'cancelled')
      .reduce((sum, o) => sum + o.totalAmount, 0);
    
    return {
      totalProducts: mockProducts.length,
      totalCategories: mockCategories.length,
      totalOrders: mockOrders.length,
      pendingOrders,
      estimatedRevenue,
    };
  },

  async getRecentOrders(limit = 5) {
    await delay(300);
    return mockOrders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  },
};
