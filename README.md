# moonar

Tells you what phase the moon is in tonight! It also tells you which constellation it's in, Zodiac-wise, and provides a heads-up on when the next full or new moon is (assuming you're not looking right at one).

<a href="http://moonar.rocks">moonar.rocks</a>

### Tech Stack

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1920px-React-icon.svg.png" width="120" alt="React" />
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1920px-Node.js_logo.svg.png" width="120" alt="Node.js" />
<img src="https://moriohcdn.b-cdn.net/8c8203b86e.png" width="120" alt="Express" />
<img src="https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png" width="120" alt="MongoDB" />
<img src="https://raw.githubusercontent.com/webpack/media/master/logo/logo-on-white-bg.png" width="120" alt="Webpack" />
<img src="https://www.multichannel.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_500/MTU0MDYzODE5MTk5MDMwMzU0/aws-logojpg.webp" width="120" alt="AWS" />                                                                                         
<img src="https://foghornconsulting.com/wp-content/uploads/2016/08/elastic_beanstalk.png" width="120" alt="AWS Elastic Beanstalk" />
<img src="https://cdn.worldvectorlogo.com/logos/docker.svg" width="120" alt="docker" />
<img src="https://cdn.freebiesupply.com/logos/large/2x/jest-logo-png-transparent.png" width="120" alt="Jest" />
<img src="https://content.invisioncic.com/r125076/monthly_2018_09/image.png.1160c4259c0fcfd678fdf455c42220f0.png" width="120" alt="paint.net" />

### How It Works

Moonar's front end was created with ReactJS and webpack, and its back end sits on good ol' Node.js. Its client makes a call for the lunar data it needs for this month and next month, which is stored in a Mongo Atlas collection, then arrives at the necessary conclusions regarding the moon's current phase, current location, and upcoming transitions. The data is derived from lunation numbers supplied by Dark Sky, so I would be remiss not to mention that we're Powered By Dark Sky™. Whenever a given month's lunation data isn't found, e.g. we roll over to November and we don't yet have December's info, moonar makes a full month's worth of external API calls to Dark Sky, then stores that info as a new document in the database for future reference. Ideally, because it works a month ahead, we'll never be waiting on those calls when we visit the site. If literally nobody visits for several months, though, we might have to endure a good six or seven second's worth of waiting as we ring up the fine folks at Dark Sky.

As bonus, it'll also tell you if Mercury is retrograde! Useful info, that.

### External APIs used

- <a href="https://darksky.net/poweredby/">Dark Sky</a>
- <a href="https://mercuryretrogradeapi.com">Mercury Retrograde API</a>

## Future Plans

- Animate the moon's phase to slightly wane/wax
- Look into 3D graphics for moon, to allow interaction
- Update desktop view to better utilize the widescreen real estate
- Potentially visualize the lunar calendar's next few days
- Refactor some of the front end for better code re-use
- Utilize express routing a bit more efficiently in the Node.js server code
- Ensure the app's future-proofing is pristine
- Investigate any other potential celestial data that might be fun to have, without distracting from the core functionality
