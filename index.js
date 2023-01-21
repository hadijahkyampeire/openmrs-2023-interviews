// Fellowship interview 2023

async function trendingStocks(n) {

  // fetch symbols
  const symbolsResponse = await fetch('https://eottfqf2cdmfwdz.m.pipedream.net/api/fe/stock-symbols')
    .then(response => response.json())
    .catch(error => console.log(error, 'error'));


  // fetch Prices
  const symbols = symbolsResponse.slice(0, n).map(d => d.symbol);

  const pricesResponse = await fetch(`https://eottfqf2cdmfwdz.m.pipedream.net/api/fe/stock-prices?symbols=${JSON.stringify(symbols)}`)
    .then(response => response.json())
    .catch(error => console.log(error, 'error'));
 

  // fetch Market caps with symbols
  const marketCaps = await fetch('https://eottfqf2cdmfwdz.m.pipedream.net/api/fe/stock-market-caps')
    .then(response => response.json())
    .catch(error => console.log(error, 'error'));


  // Form final array
  const finalResults = pricesResponse.map((p, i) => ({ 
    ...p, 
    name: symbolsResponse.find(sr => sr.symbol === p.symbol).name, 
    'market-cap': marketCaps.find(mc => mc.symbol === p.symbol)['market-cap'] 
  }) );

  console.log(finalResults, 'Final array');

}

trendingStocks(3);