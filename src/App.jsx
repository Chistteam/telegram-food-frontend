import { useState } from 'react';
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';

function App() {
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    try {
      const provider = new WalletConnectProvider({
        rpc: {
          1: "https://mainnet.infura.io/v3/YOUR_INFURA_ID" // ← explicitly your Infura ID here
        },
      });

      await provider.enable();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      setWalletAddress(accounts[0]);

      alert(`Connected wallet: ${accounts[0]}`);
    } catch (error) {
      console.error(error);
      alert('Wallet connection failed: ' + error.message);
    }
  };

  const payNow = async () => {
    if (!walletAddress) return alert('Please connect wallet first!');
    try {
      const provider = new WalletConnectProvider({
        rpc: {
          1: "https://mainnet.infura.io/v3/YOUR_INFURA_ID" // explicitly your Infura ID here again
        },
      });

      await provider.enable();
      const web3 = new Web3(provider);

      const tx = await web3.eth.sendTransaction({
        from: walletAddress,
        to: '0xF1d3290d7d74d9254A751e745622f226B3f5dFD7',
        value: web3.utils.toWei('0.01', 'ether'),
      });

      alert(`✅ Payment sent! TX: ${tx.transactionHash}`);
    } catch (error) {
      console.error(error);
      alert('Payment failed: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">🚀 Telegram Crypto Food Delivery</h1>

      {!walletAddress ? (
        <button className="bg-blue-500 text-white rounded px-4 py-2" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <>
          <p className="mb-4">Connected: {walletAddress}</p>
          <button className="bg-green-500 text-white rounded px-4 py-2" onClick={payNow}>
            Pay 0.01 ETH
          </button>
        </>
      )}
    </div>
  );
}

export default App;
