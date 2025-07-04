const products = [
  {
  "id": 1,
  "name": "TruNest Investment",
  "description": "Earns 10% interest on your Investment.",
  "features": [
    "Investment value - 3.86",
    "Daily Token -0.39",
    "Estimated returns - 2.32",
    "Investment period - 14 days"
  ],
  "ctaText": "Purchase Plan",
  "longDescription": "The TruNest Investment plan allows you to withdraw a fixed daily token of $0.39 consistently over a 14-day period, providing a steady return on your initial investment. This structure ensures predictable earnings and minimal risk, making it ideal for investors seeking short-term gains with stable returns. Would you like to proceed with this investment opportunity?",
  "amount": 3.86
},
  {
    "id": 2,
    "name": "NeoGrowth Investment",
    "description": "Fresh capital.15% Steady returns. Smart beginnings",
    "features": ["Investment value - $3.86 ", "Daily Token - $0.39", "Estimated returns - $2.32", "Investment period - 21 Days"],
    "ctaText": "Purchase Plan",
    "longDescription": "The NeoGrowth Investment plan is tailored for those seeking fresh capital and steady returns. With a daily token of $0.39 over a 21-day period, this plan offers a balanced approach to investment, ensuring consistent growth while minimizing risk. Would you like to proceed with this investment opportunity?",
    "amount": 3.86

  },
  {
    "id": 3,
    "name": "CrystalRate Investment",
    "description": "Clarity in growth. Confidence in  15%returns over the investment period.",
    "features": ["Investment value - $15.48 ", "Daily Token - $0.39", "Estimated returns - $2.32", "Investment period - 21 Days"],
    "ctaText": "Purchase Plan",
    "longDescription": "The CrystalRate Investment plan offers a transparent and reliable investment opportunity with a daily token of $0.39 over a 21-day period. This plan is designed for those who value clarity in their financial growth, providing a steady return on your initial investment while minimizing risk. Would you like to proceed with this investment opportunity?",
    "amount": 15.48
  },
  {
    "id": 4,
    "name": "VerdeVest Equity Plan",
    "description": "Green-minded gains with a progressive edge. Earn 10% interest on your Investment.",
    "features": ["Investment value - $23.22 ", "Daily Token - $0.39", "Estimated returns - $2.32", "Investment period - 30 Days"],
    "ctaText": "Purchase Plan", 
    "longDescription": "The VerdeVest Equity Plan is designed for environmentally conscious investors, offering a daily token of $0.39 over a 30-day period. This plan not only provides a steady return on your investment but also aligns with sustainable financial practices. Would you like to proceed with this investment opportunity?",
    "amount": 23.22
  },
  {
    "id": 5,
    "name": "OptimaYield Equity Plan",
    "description": "Where opportunity meets optimized returns. Earn 20%  interest on your Investment.",
    "features": ["Investment value - $38.70 ", "Daily Token - $0.39", "Estimated returns - $2.32", "Investment period - 30 Days"],
    "ctaText": "Purchase Plan",
    "longDescription": "The OptimaYield Equity Plan is tailored for investors seeking optimized returns with a daily token of $0.39 over a 30-day period. This plan focuses on maximizing your investment potential while ensuring a steady income stream. Would you like to proceed with this investment opportunity?",
    "amount": 38.70
  },
  {
    "id": 6,
    "name": "Ascend Equity Plan",
    "description": "Scale your future—one smart move at a time. Earn 20%  interest on your Investment.",
    "features": ["Investment value - $77.40 ", "Daily Token - $0.39", "Estimated returns - $2.32", "Investment period - 30 Days"],
    "ctaText": "Purchase Plan",
    "longDescription": "The Ascend Equity Plan is designed for those looking to scale their financial future with a daily token of $0.39 over a 30-day period. This plan emphasizes strategic growth and steady returns, making it ideal for long-term investors. Would you like to proceed with this investment opportunity?",
    "amount": 77.40
  },
  {
    "id": 7,
    "name": "BlueCore Capital Plan",
    "description": "Invest from your core. Build lasting wealth. Earn 25%  interest on your Investment.",
    "features": ["Investment value - $193.50 ", "Daily Token - $0.39", "Estimated returns - $2.32", "Investment period - 60 Days"],
    "ctaText": "Purchase Plan",
    "longDescription": "The BlueCore Capital Plan is designed for investors looking to build lasting wealth with a daily token of $0.39 over a 60-day period. This plan focuses on core investment principles while providing substantial returns. Would you like to proceed with this investment opportunity?",
    "amount": 193.50
  },
  {
    "id": 8,
    "name": "PrimeVest Capital Plan",
    "description": "Secure, strategic, and built for serious growth. Earn 25%  interest on your Investment.",
    "features": ["Investment value - $387.00 ", "Daily Token - $0.39", "Estimated returns - $2.32", "Investment period - 60 Days"],
    "ctaText": "Purchase Plan",
    "longDescription": "The PrimeVest Capital Plan is tailored for serious investors seeking secure and strategic growth with a daily token of $0.39 over a 60-day period. This plan is designed to maximize your investment potential while ensuring a steady income stream. Would you like to proceed with this investment opportunity?",
    "amount": 387.00
  },
  {
    "id": 9,
    "name": "wealthvest Capital Plan ",
    "description": "Molding your financial future with strength and strategy. Earn 25%  interest on your Investment.",
    "features": ["Investment value - $580.50 ", "Daily Token - $0.39", "Estimated returns - $2.32", "Investment period - 60 Days"],
    "ctaText": "Purchase Plan",
    "longDescription": "The WealthVest Capital Plan is designed for those looking to mold their financial future with strength and strategy. With a daily token of $0.39 over a 60-day period, this plan provides a solid foundation for substantial returns. Would you like to proceed with this investment opportunity?",
    "amount": 580.50
  },
  {
    "id": 10,
    "name": "ExcelVest Wealth Plan",
    "description": "Rise above. Invest beyond. Lead financially. Earn 30%  interest on your Investment.",
    "features": ["Investment value - $774.00 ", "Daily Token - $0.39", "Estimated returns - $2.32", "Investment period - 90 Days"],
    "ctaText": "Purchase Plan",
    "longDescription": "The ExcelVest Wealth Plan is designed for those who aspire to rise above and lead financially. With a daily token of $0.39 over a 90-day period, this plan offers substantial returns while emphasizing strategic investment practices. Would you like to proceed with this investment opportunity?",
    "amount": 774.00
  },
  {
    "id": 11,
    "name": "SkyVest Wealth Plan",
    "description": " Invest beyond the Sky. Propriate your financial future. Earn 30%  interest on your Investment.",
    "features": ["Investment value - $1,161.00 ", "Daily Token - $0.39", "Estimated returns - $2.32", "Investment period - 90 Days"],
    "ctaText": "Purchase Plan",
    "longDescription": "The SkyVest Wealth Plan is designed for ambitious investors looking to appropriate their financial future. With a daily token of $0.39 over a 90-day period, this plan provides significant returns while encouraging strategic investment decisions. Would you like to proceed with this investment opportunity?",
    "amount": 1161.00
  },
  {
    "id": 12,
    "name": "HorizonVest Wealth Plan",
    "description": "Rule the horizon financially. Earn 30%  interest on your Investment.",
    "features": ["Investment value - $1,935.00 ", "Daily Token - $0.39", "Estimated returns - $2.32", "Investment period - 90 Days"],
    "ctaText": "Purchase Plan",
    "longDescription": "The HorizonVest Wealth Plan is designed for those who aim to rule their financial horizon. With a daily token of $0.39 over a 90-day period, this plan offers substantial returns while promoting strategic investment practices. Would you like to proceed with this investment opportunity?",
    "amount": 1935.00
  }
];

const getProducts = () => {
  return products;
};

module.exports = {
  getProducts,
};
// This module exports a function to retrieve a list of banking products.