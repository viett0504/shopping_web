import { delay } from '../utils/delay';
import { mockOrders } from './mockData';

export const adminOrderService = {
  async getOrders(params = {}) {
    await delay(500);
    let filtered = [...mockOrders];
    
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(o => 
        o.orderCode.toLowerCase().includes(searchLower) ||
        o.customerName.toLowerCase().includes(searchLower) ||
        o.customerPhone.includes(searchLower)
      );
    }
    
    if (params.orderStatus) {
      filtered = filtered.filter(o => o.orderStatus === params.orderStatus);
    }
    
    if (params.paymentMethod) {
      filtered = filtered.filter(o => o.paymentMethod === params.paymentMethod);
    }
    
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const startIndex = (page - 1) * limit;
    const paginatedItems = filtered.slice(startIndex, startIndex + limit);
    
    return {
      items: paginatedItems,
      total: filtered.length,
      page,
      limit,
    };
  },

  async getOrderById(id) {
    await delay(300);
    return mockOrders.find(o => o.id === Number(id));
  },

  async updateOrderStatus(id, orderStatus) {
    await delay(500);
    const order = mockOrders.find(o => o.id === Number(id));
    if (!order) throw new Error('Order not found');
    order.orderStatus = orderStatus;
    order.updatedAt = new Date().toISOString();
    return order;
  },
};
