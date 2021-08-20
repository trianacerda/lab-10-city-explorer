const fetch = require('node-fetch');

async function getWeatherData(lat, lon) {
  const apiRes = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_IO_KEY}&lat=${lat}&lon=${lon}`);
  const apiData = await apiRes.json();
  const data = apiData.data.map((wo) => {
    return {
      forecast: wo.weather.description,
      time: new Date(wo.ts * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
    };
  });
  return data;
}


async function getReviewsData(lat, lon) {
  let url = (`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`);
  let bearer = 'Bearer ' + `${process.env.YELP_KEY}`;
  const results = await fetch(url, {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': bearer,
      'Content-Type': 'application/json'
    }
  });

  const apiResp = await results.json();
  const businesses = apiResp.businesses;
  const reviewsData = businesses.map(rd => {
    // console.log(reviewsData)
    return{
      name: rd.name,
      image_url: rd.image_url,
      price: rd.price,
      rating: rd.rating,
      url: rd.url
    };
  });
  return reviewsData;
}

module.exports = {
  getWeatherData,
  getReviewsData,
};