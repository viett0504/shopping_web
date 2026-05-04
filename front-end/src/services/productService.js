import { delay } from '../utils/delay';
import { mockProducts } from './mockData';

export const productService = {
  async getProducts(params = {}) {
    await delay(500);
    
    let filtered = [...mockProducts];
    
    // Filter by search
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.shortDescription?.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by category
    if (params.categoryId) {
      filtered = filtered.filter(p => p.categoryId === Number(params.categoryId));
    }
    
    // Filter by price range
    if (params.minPrice) {
      filtered = filtered.filter(p => {
        const price = p.salePrice || p.price;
        return price >= Number(params.minPrice);
      });
    }
    if (params.maxPrice) {
      filtered = filtered.filter(p => {
        const price = p.salePrice || p.price;
        return price <= Number(params.maxPrice);
      });
    }
    
    // Filter by size
    if (params.size) {
      filtered = filtered.filter(p => p.sizes?.includes(params.size));
    }
    
    // Filter by color
    if (params.color) {
      filtered = filtered.filter(p => p.colors?.includes(params.color));
    }
    
    // Filter by status
    if (params.status) {
      filtered = filtered.filter(p => p.status === params.status);
    } else {
      // Default: only show active products
      filtered = filtered.filter(p => p.status === 'active');
    }
    
    // Sort
    if (params.sort === 'price_asc') {
      filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (params.sort === 'price_desc') {
      filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    } else if (params.sort === 'best_seller') {
      filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    } else {
      // Default: newest first
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    // Pagination
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = filtered.slice(startIndex, endIndex);
    
    return {
      items: paginatedItems,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    };
  },

  async getProductBySlug(slug) {
    await delay(300);
    const product = mockProducts.find(p => p.slug === slug && p.status === 'active');
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  },

  async getProductById(id) {
    await delay(300);
    const product = mockProducts.find(p => p.id === Number(id));
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  },

  async getFeaturedProducts(limit = 8) {
    await delay(300);
    return mockProducts
      .filter(p => p.isFeatured && p.status === 'active')
      .slice(0, limit);
  },

  async getNewProducts(limit = 8) {
    await delay(300);
    return mockProducts
      .filter(p => p.isNew && p.status === 'active')
      .slice(0, limit);
  },

  async getRelatedProducts(categoryId, currentProductId, limit = 4) {
    await delay(300);
    return mockProducts
      .filter(p => 
        p.categoryId === categoryId && 
        p.id !== currentProductId && 
        p.status === 'active'
      )
      .slice(0, limit);
  },
};
