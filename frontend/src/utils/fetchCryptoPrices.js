// fetchCryptoPrices.js
export async function fetchCryptoPrices() {
  const ids = ['bitcoin', 'ethereum', 'binancecoin', 'pi-network-token'];
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(',')}&vs_currencies=usd`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    btc: data.bitcoin.usd,
    eth: data.ethereum.usd,
    bnb: data.binancecoin.usd,
    pi: data['pi-network-token']?.usd || 'N/A',
  };
}
