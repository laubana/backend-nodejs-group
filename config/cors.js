const cors = {
  origin: (origin, callback) => {
    if (
      ["http://localhost:3000", "http://127.0.0.1:3000"].indexOf(origin) !==
        -1 ||
      !origin
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 204,
};

module.exports = { cors };
