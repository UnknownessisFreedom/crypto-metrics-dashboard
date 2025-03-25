import '@/app/globals.css';
import RootLayout from '@/components/layout/RootLayout';

export const metadata = {
  title: 'Crypto Metrics Dashboard',
  description: 'Real-time metrics for Bitcoin, Ethereum, and Solana',
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
