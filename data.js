// data.js
export async function getData() {
    const apiKey = 'NTZIHADF1KK03YU5';
    const symbol = 'MSFT';
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);  
        
        if (json['Error Message']) {
            throw new Error(json['Error Message']);
        }

        const timeSeries = json['Time Series (Daily)'];
        const labels = Object.keys(timeSeries).slice(0, 30).reverse();  
        const values = labels.map(label => parseFloat(timeSeries[label]['4. close']));

        return {
            labels,
            values
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            labels: [],
            values: []
        };
    }
}
