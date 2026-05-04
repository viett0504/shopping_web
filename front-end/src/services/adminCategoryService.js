import { delay } from '../utils/delay';
import { mockCategories } from './mockData';

export const adminCategoryService = {
  async getCategories(params = {}) {
    await delay(300);
    let filtered = [...mockCategories];
    
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  },

  async getCategoryById(id) {
    await delay(300);
    return mockCategories.find(c => c.id === Number(id));
  },

  async createCategory(categoryData) {
    await delay(500);
    const newCategory = {
      id: Math.max(...mockCategories.map(c => c.id)) + 1,
      ...categoryData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockCategories.push(newCategory);
    return newCategory;
  },

  async updateCategory(id, categoryData) {
    await delay(500);
    const index = mockCategories.findIndex(c => c.id === Number(id));
    if (index === -1) throw new Error('Category not found');
    
    mockCategories[index] = {
      ...mockCategories[index],
      ...categoryData,
      updatedAt: new Date().toISOString(),
    };
    return mockCategories[index];
  },

  async deleteCategory(id) {
    await delay(500);
    const index = mockCategories.findIndex(c => c.id === Number(id));
    if (index === -1) throw new Error('Category not found');
    mockCategories.splice(index, 1);
    return { success: true };
  },
};
