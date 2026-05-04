import { delay } from '../utils/delay';
import { mockCategories } from './mockData';

export const categoryService = {
  async getCategories() {
    await delay(300);
    return mockCategories.filter(c => c.status === 'active');
  },

  async getCategoryById(id) {
    await delay(300);
    const category = mockCategories.find(c => c.id === Number(id));
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  },

  async getCategoryBySlug(slug) {
    await delay(300);
    const category = mockCategories.find(c => c.slug === slug);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  },
};
