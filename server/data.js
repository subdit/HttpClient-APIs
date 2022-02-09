const http = require("https");

const options = {
  method: "GET",
  hostname: "amazon-products1.p.rapidapi.com",
  port: null,
  path: "/product?country=US&asin=B08BF4CZSV&topReviews=true",
  headers: {
    "x-rapidapi-host": "amazon-products1.p.rapidapi.com",
    "x-rapidapi-key": "8012fb5828mshbe38c641de265efp1ed6a8jsn9898af471baa",
    useQueryString: true,
  },
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
