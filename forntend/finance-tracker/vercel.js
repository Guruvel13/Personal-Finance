module.exports = {
  rewrites: [
    {
      source: "/api/(.*)",
      destination: "https://personal-finance-7m5y.onrender.com/api/$1"
    }
  ],
  redirects: [
    {
      source: "/",
      destination: "/index.html",
      statusCode: 301
    }
  ],
  cleanUrls: true,
  trailingSlash: false
};
