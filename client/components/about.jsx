import React from "react";
import PropTypes from "prop-types";

const About = props => {
  return (
    <>
      <h2>about moonar</h2>
      <h3>why would one do such a thing?</h3>
      <p>
        Howdy! Mitchell here. I made moonar so my lovely wife, Mollie, would
        know what kinda moon is going on up there, and when that moon might next
        be full or new. Now when it is the night's time, one absolutely can poke
        their head out their window--after throwing open their sash, of
        course--and peer on up into the inky black of all that space. But what
        this app supposes is, what if sometimes it is daytime??? Also it tells
        you what constellation, the moon is in, zodiac-wise. That's neat.
      </p>
      <h3>what maniac would do such a thing?</h3>
      <p>
        Everything was coded, designed, and drawn by me, Mitchell Dill. You can
        find me on <a href="https://github.com/mitchelldill">github</a> or
        <a href="https://twitter.com/mitchelldill">twitter</a>.
      </p>
      <h3>how exactly would said maniac do such a thing?</h3>
      <p>
        There's a more in-depth accounting over in the readme on github, but the
        gist is that moonar makes a call for the lunar data it needs for this
        month and next month, which is stored in a mongoDB collection, and draws
        the necessary conclusions. The data is derived from lunation numbers
        supplied by Dark Sky, so per their wishes we are most assuredly Powered
        By Dark Sky tm. Whenever a month's data isn't found, e.g. we roll over
        to November and we don't yet have December's info, moonar makes a full
        month's worth of external API calls to Dark Sky, then stores that info
        as a new document in the database.
      </p>
    </>
  );
};

export default About;

About.propTypes = {};
