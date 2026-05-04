import { delay } from '../utils/delay';
import { mockOrders, mockProducts } from './mockData';

let orderIdCounter = 2;
let orderCodeCounter = 2;

export const orderService = {
  async createOrder(orderData) {
    await delay(800);
    
    // Validate items
    if (!orderData.items || orderData.items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    
    // Calculate total and create order items
    let totalAmount = 0;
    const orderItems = orderData.items.map((item, index) => {
      const product = mockProducts.find(p => p.id === item.productId);
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }
      
      const price = product.salePrice || product.price;
      const itemTotal = price * item.quantity;
      totalAmount += itemTotal;
      
      return {
        id: index + 1,
        orderId: orderIdCounter,
        productId: product.id,
        productName: product.name,
        productImage: product.imageUrl,
        price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        totalPrice: itemTotal,
        createdAt: new Date().toISOString(),
      };
    });
    
    // Generate order code
    const orderCode = `DH${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${String(orderCodeCounter).padStart(4, '0')}`;
    
    // Create order
    const newOrder = {
      id: orderIdCounter,
      orderCode,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerEmail: orderData.customerEmail,
      shippingAddress: orderData.shippingAddress,
      province: orderData.province,
      district: orderData.district,
      note: orderData.note,
      totalAmount,
      paymentMethod: orderData.paymentMethod,
      orderStatus: 'pending',
      items: orderItems,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockOrders.push(newOrder);
    orderIdCounter++;
    orderCodeCounter++;
    
    return {
      success: true,
      orderCode,
      orderId: newOrder.id,
    };
  },

  async getOrderByCode(orderCode) {
    await delay(300);
    const order = mockOrders.find(o => o.orderCode === orderCode);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  },
};
