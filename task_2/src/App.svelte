<script>
  import { onMount } from 'svelte';

  let amount = 1; 
  let fromCurrency = 'USD'; 
  let toCurrency = 'EUR'; 
  let exchangeRate = 0; 

  async function updateExchangeRate() {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    exchangeRate = data.rates[toCurrency];
  }
  
  onMount(() => {
    updateExchangeRate();
  });

  // @ts-ignore
  function updateAmount(value) {
    amount = value;
  }

  // @ts-ignore
  function handleCurrencyChange(event) {
    if (event.target.name === 'fromCurrency') {
      fromCurrency = event.target.value;
    } else {
      toCurrency = event.target.value;
    }
    updateExchangeRate();
  }
</script>

<main>
  <h1>Конвертация Валют</h1>
  <div class="converter">
    <div>
      <label for="fromCurrency">С валюты:</label>
      <select id="fromCurrency" name="fromCurrency" bind:value={fromCurrency} on:change={handleCurrencyChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="RUB">RUB</option>
        <option value="CNY">CNY</option>
        <option value="KRW">KRW</option>
      </select>
      <input type="number" min="0" step="1" bind:value={amount} on:input={updateAmount} />
    </div>
    <div>
      <label for="toCurrency">В Валюту:</label>
      <select id="toCurrency" name="toCurrency" bind:value={toCurrency} on:change={handleCurrencyChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="RUB">RUB</option>
        <option value="CNY">CNY</option>
        <option value="KRW">KRW</option>
      </select>
      <input type="number" min="0" step="1" readonly value={amount * exchangeRate} />
    </div>
  </div>
</main>

<style>
  main {
    font-family: Arial, sans-serif;
    text-align: center;
  }

  h1 {
    margin-bottom: 1em;
  }

  .converter {
    display: flex;
    justify-content: space-around;
    margin-bottom: 2em;
  }

  label,
  select,
  input {
    margin-bottom: 1em;
  }

  select,
  input {
    font-size: 1em;
  }
</style>