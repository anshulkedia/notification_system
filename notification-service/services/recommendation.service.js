const Notification = require('../models/Notification');

// Mock data
const mockPurchaseHistory = {
  '123456': ['Electronics', 'Books'],
  '654321': ['Clothing', 'Footwear'],
};

const mockBrowsingHistory = {
  '123456': ['Gaming', 'Electronics'],
  '654321': ['Accessories', 'Footwear'],
};

// Mock product recommendations by category
const productCatalog = {
  Electronics: ['Wireless Earbuds', 'Smartphone Gimbal'],
  Books: ['Atomic Habits', 'The Alchemist'],
  Gaming: ['Gaming Mouse', 'Mechanical Keyboard'],
  Clothing: ['Denim Jacket', 'Graphic Tee'],
  Footwear: ['Running Shoes', 'Sneakers'],
  Accessories: ['Smartwatch', 'Leather Wallet'],
};

// Helper: Get unique recommendations
const getRecommendations = (categories) => {
  const recommended = new Set();
  categories.forEach((cat) => {
    if (productCatalog[cat]) {
      productCatalog[cat].forEach((item) => recommended.add(item));
    }
  });
  return Array.from(recommended);
};

// Main function: Generate and store personalized notifications
const generateAndStoreRecommendations = async (userId) => {
  const purchaseCategories = mockPurchaseHistory[userId] || [];
  const browsingCategories = mockBrowsingHistory[userId] || [];

  const combinedCategories = [...new Set([...purchaseCategories, ...browsingCategories])];
  const recommendations = getRecommendations(combinedCategories);

  const notifications = recommendations.map((product) => ({
    userId,
    type: 'recommendation',
    content: `We think you'll love: ${product}`,
    read: false,
    sentAt: new Date().toISOString(),
  }));

  try {
    // Save all notifications to MongoDB
    await Notification.insertMany(notifications);
    console.log(`✅ Personalized notifications created for user ${userId}`);
  } catch (err) {
    console.error(`❌ Error saving personalized notifications for user ${userId}:`, err);
    throw err;
  }
};

module.exports = {
  generateAndStoreRecommendations
};