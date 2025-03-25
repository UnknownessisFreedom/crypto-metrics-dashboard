import { useState, useEffect } from 'react';
import axios from 'axios';

// Mock data for Bitcoin metrics
export const fetchBitcoinPrice = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    return response.data.bitcoin.usd;
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error);
    return 65000; // Fallback value
  }
};

// Mock data for Bitcoin metrics
export const fetchBitcoinMetrics = async () => {
  // In a real app, this would fetch from a blockchain API
  return {
    price: await fetchBitcoinPrice(),
    marketCap: 1250000000000,
    volume24h: 28500000000,
    circulatingSupply: 19500000,
    hashRate: 450000000,
    difficulty: 72000000000000,
    blockHeight: 835000,
    activeAddresses: 950000,
  };
};

// Mock data for exchange flows
export const fetchExchangeFlows = async () => {
  return {
    inflow24h: 12500,
    outflow24h: 14200,
    netFlow24h: -1700,
    exchangeBalance: 2450000,
    percentOnExchanges: 12.5,
  };
};

// Mock data for historical price
export const fetchHistoricalPriceData = async () => {
  const days = 30;
  const data = [];
  const today = new Date();
  const basePrice = 65000;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Create some realistic price movements
    const randomFactor = 0.02; // 2% daily movement max
    const dailyChange = basePrice * randomFactor * (Math.random() * 2 - 1);
    const price = basePrice + (dailyChange * (days - i));
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: Math.max(price, basePrice * 0.8), // Ensure price doesn't drop too much
    });
  }
  
  return data;
};

// Mock data for HODL waves (supply age distribution)
export const fetchHodlWaves = async () => {
  return [
    { name: '< 1 day', value: 2 },
    { name: '1-7 days', value: 5 },
    { name: '1-4 weeks', value: 7 },
    { name: '1-3 months', value: 10 },
    { name: '3-6 months', value: 12 },
    { name: '6-12 months', value: 15 },
    { name: '1-2 years', value: 18 },
    { name: '2-3 years', value: 12 },
    { name: '3-5 years', value: 10 },
    { name: '5+ years', value: 9 },
  ];
};

// Mock data for Ethereum metrics
export const fetchEthereumMetrics = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const price = response.data.ethereum.usd;
    
    return {
      price,
      marketCap: 350000000000,
      volume24h: 12500000000,
      circulatingSupply: 120000000,
      gasPrice: 25, // Gwei
      totalValueLocked: 48000000000,
      activeAddresses: 650000,
    };
  } catch (error) {
    console.error('Error fetching Ethereum price:', error);
    // Fallback values
    return {
      price: 3500,
      marketCap: 350000000000,
      volume24h: 12500000000,
      circulatingSupply: 120000000,
      gasPrice: 25, // Gwei
      totalValueLocked: 48000000000,
      activeAddresses: 650000,
    };
  }
};

// Mock data for Solana metrics
export const fetchSolanaMetrics = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
    const price = response.data.solana.usd;
    
    return {
      price,
      marketCap: 65000000000,
      volume24h: 3500000000,
      circulatingSupply: 450000000,
      stakingYield: 5.8,
      totalValueLocked: 8500000000,
      activeAddresses: 320000,
    };
  } catch (error) {
    console.error('Error fetching Solana price:', error);
    // Fallback values
    return {
      price: 145,
      marketCap: 65000000000,
      volume24h: 3500000000,
      circulatingSupply: 450000000,
      stakingYield: 5.8,
      totalValueLocked: 8500000000,
      activeAddresses: 320000,
    };
  }
};

// Hook for fetching crypto data
export const useCryptoData = (cryptoType) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let result;
        
        switch (cryptoType) {
          case 'bitcoin':
            result = await fetchBitcoinMetrics();
            break;
          case 'ethereum':
            result = await fetchEthereumMetrics();
            break;
          case 'solana':
            result = await fetchSolanaMetrics();
            break;
          case 'exchange-flows':
            result = await fetchExchangeFlows();
            break;
          case 'historical-price':
            result = await fetchHistoricalPriceData();
            break;
          case 'hodl-waves':
            result = await fetchHodlWaves();
            break;
          default:
            result = await fetchBitcoinMetrics();
        }
        
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message || 'An error occurred');
        console.error('Error in useCryptoData:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Set up interval for real-time updates (every 30 seconds)
    const intervalId = setInterval(fetchData, 30000);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [cryptoType]);

  return { data, loading, error };
};
