const whitelist = ['http://localhost:3000', 'http://localhost:8000'];

const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = { corsOptions };
