import React from 'react';
import { useCryptoData } from '@/lib/api/crypto';
import MetricCard from '@/components/ui/MetricCard';
import PriceChart from '@/components/charts/PriceChart';

export default function SolanaPage() {
  const { data: solanaData, loading: solanaLoading } = useCryptoData('solana');
  const { data: historicalData, loading: historicalLoading } = useCryptoData('historical-price');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Solana Metrics</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Solana Price"
            value={solanaLoading ? "Loading..." : `$${solanaData?.price.toLocaleString()}`}
            change="-0.7"
            description="24h change"
            isLoading={solanaLoading}
          />
          <MetricCard
            title="Market Cap"
            value={solanaLoading ? "Loading..." : `$${(solanaData?.marketCap / 1000000000).toFixed(2)}B`}
            change="-0.5"
            description="24h change"
            isLoading={solanaLoading}
          />
          <MetricCard
            title="24h Volume"
            value={solanaLoading ? "Loading..." : `$${(solanaData?.volume24h / 1000000000).toFixed(2)}B`}
            change="2.1"
            description="24h change"
            isLoading={solanaLoading}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PriceChart 
          data={historicalData} 
          title="Solana Price (30 Days)" 
          color="#00FFA3"
        />
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-4">Staking Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              title="Staking Yield"
              value={solanaLoading ? "Loading..." : `${solanaData?.stakingYield}%`}
              change="0.2"
              isLoading={solanaLoading}
            />
            <MetricCard
              title="Total Value Locked"
              value={solanaLoading ? "Loading..." : `$${(solanaData?.totalValueLocked / 1000000000).toFixed(2)}B`}
              change="1.3"
              isLoading={solanaLoading}
            />
            <MetricCard
              title="Active Validators"
              value={solanaLoading ? "Loading..." : "1,785"}
              change="0.5"
              isLoading={solanaLoading}
            />
            <MetricCard
              title="Circulating Supply"
              value={solanaLoading ? "Loading..." : `${(solanaData?.circulatingSupply / 1000000).toFixed(2)}M SOL`}
              change="0.1"
              isLoading={solanaLoading}
            />
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Network Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Transactions Per Second"
            value={solanaLoading ? "Loading..." : "2,458"}
            change="5.2"
            isLoading={solanaLoading}
          />
          <MetricCard
            title="Average Transaction Fee"
            value={solanaLoading ? "Loading..." : "$0.00025"}
            change="-2.1"
            isLoading={solanaLoading}
          />
          <MetricCard
            title="Active Addresses"
            value={solanaLoading ? "Loading..." : solanaData?.activeAddresses.toLocaleString()}
            change="3.5"
            isLoading={solanaLoading}
          />
          <MetricCard
            title="Program Deployments (24h)"
            value={solanaLoading ? "Loading..." : "124"}
            change="8.7"
            isLoading={solanaLoading}
          />
        </div>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">About Solana Metrics</h2>
        <p className="text-gray-300">
          This page provides detailed metrics for Solana, including price information, staking metrics, and network activity.
          All data is updated automatically every 30 seconds. For this demo version, some data is simulated while price data is fetched from CoinGecko API.
        </p>
      </div>
    </div>
  );
}
