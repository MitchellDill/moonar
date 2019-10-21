const whitelist = [
  'http://localhost:3000',
  'http://moonar.us-east-2.elasticbeanstalk.com',
];

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
