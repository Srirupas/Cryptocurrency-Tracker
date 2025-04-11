const apiURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';
const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('search');

async function fetchData() {
  const res = await fetch(apiURL);
  const data = await res.json();
  displayData(data);

  // Add search functionality
  searchInput.addEventListener('input', () => {
    const filtered = data.filter(coin =>
      coin.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    displayData(filtered);
  });
}

function displayData(coins) {
  tableBody.innerHTML = '';
  coins.forEach(coin => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${coin.image}" width="20" height="20" style="vertical-align:middle"> 
        ${coin.name} (${coin.symbol.toUpperCase()})
      </td>
      <td>$${coin.current_price.toLocaleString()}</td>
      <td>$${coin.market_cap.toLocaleString()}</td>
      <td style="color: ${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
        ${coin.price_change_percentage_24h.toFixed(2)}%
      </td>
    `;
    tableBody.appendChild(row);
  });
}

fetchData();
