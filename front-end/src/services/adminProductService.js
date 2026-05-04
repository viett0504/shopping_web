import { delay } from '../utils/delay';
import { mockProducts } from './mockData';

export const adminProductService = {
  async getProducts(params = {}) {
    await delay(500);
    
    let filtered = [...mockProducts];
    
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower)
      );
    }
    
    if (params.categoryId) {
      filtered = filtered.filter(p => p.categoryId === Number(params.categoryId));
    }
    
    if (params.status) {
      filtered = filtered.filter(p => p.status === params.status);
    }
    
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

  async getProductById(id) {
    await delay(300);
    return mockProducts.find(p => p.id === Number(id));
  },

  async createProduct(productData) {
    await delay(500);
    const newProduct = {
      id: Math.max(...mockProducts.map(p => p.id)) + 1,
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockProducts.push(newProduct);
    return newProduct;
  },

  async updateProduct(id, productData) {
    await delay(500);
    const index = mockProducts.findIndex(p => p.id === Number(id));
    if (index === -1) throw new Error('Product not found');
    
    mockProducts[index] = {
      ...mockProducts[index],
      ...productData,
      updatedAt: new Date().toISOString(),
    };
    return mockProducts[index];
  },

  async deleteProduct(id) {
    await delay(500);
    const index = mockProducts.findIndex(p => p.id === Number(id));
    if (index === -1) throw new Error('Product not found');
    mockProducts.splice(index, 1);
    return { success: true };
  },

  async updateProductStatus(id, status) {
    await delay(300);
    const product = mockProducts.find(p => p.id === Number(id));
    if (!product) throw new Error('Product not found');
    product.status = status;
    product.updatedAt = new Date().toISOString();
    return product;
  },
};
