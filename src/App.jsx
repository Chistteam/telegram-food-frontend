import { useState } from 'react';
import { ethers } from 'ethers';
import { WalletConnectModal } from '@walletconnect/modal';

const walletConnectModal = new WalletConnectModal({
  projectId: '71c1a7347111a137ad1c50ab795635b5', // Your WalletConnect project ID clearly here
  chains: [1], // Ethereum mainnet
});

function App() {
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    try {
      const provider = await walletConnectModal.connect();
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      alert(`Connected wallet: ${address}`);
    } catch (error) {
      console.error(error);
      alert('Wallet connection failed.');
    }
  };

  const payNow = async () => {
    if (!walletAddress) return alert('Please connect wallet first!');

    try {
      const provider = new ethers.BrowserProvider(walletConnectModal.getWalletProvider());
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: '0xF1d3290d7d74d9254A751e745622f226B3f5dFD7', // Clearly your Ethereum wallet address here
        value: ethers.parseEther('0.01'),
      });

      alert(`✅ Payment sent! TX: ${tx.hash}`);
    } catch (error) {
      console.error(error);
      alert('Payment failed.');
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
// Trigger redeployment again clearly
