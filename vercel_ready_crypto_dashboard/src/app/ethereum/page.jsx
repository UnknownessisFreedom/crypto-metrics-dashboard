import React from 'react';
import { useCryptoData } from '@/lib/api/crypto';
import MetricCard from '@/components/ui/MetricCard';
import PriceChart from '@/components/charts/PriceChart';

export default function EthereumPage() {
  const { data: ethereumData, loading: ethereumLoading } = useCryptoData('ethereum');
  const { data: historicalData, loading: historicalLoading } = useCryptoData('historical-price');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Ethereum Metrics</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Ethereum Price"
            value={ethereumLoading ? "Loading..." : `$${ethereumData?.price.toLocaleString()}`}
            change="1.8"
            description="24h change"
            isLoading={ethereumLoading}
          />
          <MetricCard
            title="Market Cap"
            value={ethereumLoading ? "Loading..." : `$${(ethereumData?.marketCap / 1000000000).toFixed(2)}B`}
            change="1.5"
            description="24h change"
            isLoading={ethereumLoading}
          />
          <MetricCard
            title="24h Volume"
            value={ethereumLoading ? "Loading..." : `$${(ethereumData?.volume24h / 1000000000).toFixed(2)}B`}
            change="3.2"
            description="24h change"
            isLoading={ethereumLoading}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PriceChart 
          data={historicalData} 
          title="Ethereum Price (30 Days)" 
          color="#627EEA"
        />
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-4">DeFi Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              title="Total Value Locked"
              value={ethereumLoading ? "Loading..." : `$${(ethereumData?.totalValueLocked / 1000000000).toFixed(2)}B`}
              change="2.1"
              isLoading={ethereumLoading}
            />
            <MetricCard
              title="Gas Price"
              value={ethereumLoading ? "Loading..." : `${ethereumData?.gasPrice} Gwei`}
              change="-5.4"
              isLoading={ethereumLoading}
            />
            <MetricCard
              title="Active Addresses"
              value={ethereumLoading ? "Loading..." : ethereumData?.activeAddresses.toLocaleString()}
              change="2.8"
              isLoading={ethereumLoading}
            />
            <MetricCard
              title="Circulating Supply"
              value={ethereumLoading ? "Loading..." : `${(ethereumData?.circulatingSupply / 1000000).toFixed(2)}M ETH`}
              change="0.1"
              isLoading={ethereumLoading}
            />
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Network Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Transaction Count"
            value={ethereumLoading ? "Loading..." : "1.2M"}
            change="4.5"
            description="24h"
            isLoading={ethereumLoading}
          />
          <MetricCard
            title="Average Transaction Fee"
            value={ethereumLoading ? "Loading..." : "$2.45"}
            change="-8.2"
            description="24h change"
            isLoading={ethereumLoading}
          />
          <MetricCard
            title="Smart Contract Calls"
            value={ethereumLoading ? "Loading..." : "3.8M"}
            change="6.7"
            description="24h"
            isLoading={ethereumLoading}
          />
          <MetricCard
            title="ETH Burned (24h)"
            value={ethereumLoading ? "Loading..." : "2,145 ETH"}
            change="1.2"
            isLoading={ethereumLoading}
          />
        </div>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">About Ethereum Metrics</h2>
        <p className="text-gray-300">
          This page provides detailed metrics for Ethereum, including price information, DeFi metrics, and network activity.
          All data is updated automatically every 30 seconds. For this demo version, some data is simulated while price data is fetched from CoinGecko API.
        </p>
      </div>
    </div>
  );
}
