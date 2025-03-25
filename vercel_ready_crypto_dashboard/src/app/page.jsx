import React from 'react';
import { useCryptoData } from '@/lib/api/crypto';
import MetricCard from '@/components/ui/MetricCard';
import PriceChart from '@/components/charts/PriceChart';
import DistributionChart from '@/components/charts/DistributionChart';

export default function HomePage() {
  const { data: bitcoinData, loading: bitcoinLoading } = useCryptoData('bitcoin');
  const { data: ethereumData, loading: ethereumLoading } = useCryptoData('ethereum');
  const { data: solanaData, loading: solanaLoading } = useCryptoData('solana');
  const { data: historicalData, loading: historicalLoading } = useCryptoData('historical-price');
  const { data: hodlWavesData, loading: hodlWavesLoading } = useCryptoData('hodl-waves');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Crypto Metrics Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Bitcoin Price"
            value={bitcoinLoading ? "Loading..." : `$${bitcoinData?.price.toLocaleString()}`}
            change="2.5"
            description="24h change"
            isLoading={bitcoinLoading}
          />
          <MetricCard
            title="Ethereum Price"
            value={ethereumLoading ? "Loading..." : `$${ethereumData?.price.toLocaleString()}`}
            change="1.8"
            description="24h change"
            isLoading={ethereumLoading}
          />
          <MetricCard
            title="Solana Price"
            value={solanaLoading ? "Loading..." : `$${solanaData?.price.toLocaleString()}`}
            change="-0.7"
            description="24h change"
            isLoading={solanaLoading}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PriceChart 
          data={historicalData} 
          title="Bitcoin Price (30 Days)" 
          color="#F7931A"
        />
        <DistributionChart 
          data={hodlWavesData} 
          title="Bitcoin HODL Waves (Supply Age Distribution)" 
        />
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Network Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="BTC Active Addresses"
            value={bitcoinLoading ? "Loading..." : bitcoinData?.activeAddresses.toLocaleString()}
            change="3.2"
            isLoading={bitcoinLoading}
          />
          <MetricCard
            title="ETH Gas Price"
            value={ethereumLoading ? "Loading..." : `${ethereumData?.gasPrice} Gwei`}
            change="-5.4"
            isLoading={ethereumLoading}
          />
          <MetricCard
            title="SOL Staking Yield"
            value={solanaLoading ? "Loading..." : `${solanaData?.stakingYield}%`}
            change="0.2"
            isLoading={solanaLoading}
          />
          <MetricCard
            title="BTC Hash Rate"
            value={bitcoinLoading ? "Loading..." : `${(bitcoinData?.hashRate / 1000000).toFixed(2)} EH/s`}
            change="1.5"
            isLoading={bitcoinLoading}
          />
        </div>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">About This Dashboard</h2>
        <p className="text-gray-300">
          This dashboard provides real-time metrics for Bitcoin, Ethereum, and Solana cryptocurrencies.
          All data is updated automatically every 30 seconds. The dashboard includes price information,
          network health metrics, and on-chain analytics similar to Glassnode.
        </p>
        <p className="text-gray-300 mt-2">
          For this demo version, some data is simulated while price data is fetched from CoinGecko API.
        </p>
      </div>
    </div>
  );
}
