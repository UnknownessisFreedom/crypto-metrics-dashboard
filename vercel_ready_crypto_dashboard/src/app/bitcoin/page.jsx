import React from 'react';
import { useCryptoData } from '@/lib/api/crypto';
import MetricCard from '@/components/ui/MetricCard';
import PriceChart from '@/components/charts/PriceChart';

export default function BitcoinPage() {
  const { data: bitcoinData, loading: bitcoinLoading } = useCryptoData('bitcoin');
  const { data: historicalData, loading: historicalLoading } = useCryptoData('historical-price');
  const { data: exchangeFlows, loading: exchangeLoading } = useCryptoData('exchange-flows');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bitcoin Metrics</h1>
      
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
            title="Market Cap"
            value={bitcoinLoading ? "Loading..." : `$${(bitcoinData?.marketCap / 1000000000).toFixed(2)}B`}
            change="2.3"
            description="24h change"
            isLoading={bitcoinLoading}
          />
          <MetricCard
            title="24h Volume"
            value={bitcoinLoading ? "Loading..." : `$${(bitcoinData?.volume24h / 1000000000).toFixed(2)}B`}
            change="5.7"
            description="24h change"
            isLoading={bitcoinLoading}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PriceChart 
          data={historicalData} 
          title="Bitcoin Price (30 Days)" 
          color="#F7931A"
        />
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-4">Exchange Flows</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              title="Exchange Inflow (24h)"
              value={exchangeLoading ? "Loading..." : `${exchangeFlows?.inflow24h.toLocaleString()} BTC`}
              change="3.2"
              isLoading={exchangeLoading}
            />
            <MetricCard
              title="Exchange Outflow (24h)"
              value={exchangeLoading ? "Loading..." : `${exchangeFlows?.outflow24h.toLocaleString()} BTC`}
              change="4.5"
              isLoading={exchangeLoading}
            />
            <MetricCard
              title="Net Flow (24h)"
              value={exchangeLoading ? "Loading..." : `${exchangeFlows?.netFlow24h.toLocaleString()} BTC`}
              change="-12.5"
              isLoading={exchangeLoading}
            />
            <MetricCard
              title="Exchange Balance"
              value={exchangeLoading ? "Loading..." : `${exchangeFlows?.exchangeBalance.toLocaleString()} BTC`}
              change="-0.7"
              description="% of supply on exchanges"
              isLoading={exchangeLoading}
            />
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Network Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Active Addresses"
            value={bitcoinLoading ? "Loading..." : bitcoinData?.activeAddresses.toLocaleString()}
            change="3.2"
            isLoading={bitcoinLoading}
          />
          <MetricCard
            title="Hash Rate"
            value={bitcoinLoading ? "Loading..." : `${(bitcoinData?.hashRate / 1000000).toFixed(2)} EH/s`}
            change="1.5"
            isLoading={bitcoinLoading}
          />
          <MetricCard
            title="Difficulty"
            value={bitcoinLoading ? "Loading..." : `${(bitcoinData?.difficulty / 1000000000000).toFixed(2)}T`}
            change="0.0"
            isLoading={bitcoinLoading}
          />
          <MetricCard
            title="Block Height"
            value={bitcoinLoading ? "Loading..." : bitcoinData?.blockHeight.toLocaleString()}
            isLoading={bitcoinLoading}
          />
        </div>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">About Bitcoin Metrics</h2>
        <p className="text-gray-300">
          This page provides detailed metrics for Bitcoin, including price information, exchange flows, and network health indicators.
          All data is updated automatically every 30 seconds. For this demo version, some data is simulated while price data is fetched from CoinGecko API.
        </p>
      </div>
    </div>
  );
}
