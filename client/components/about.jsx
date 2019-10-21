import React from "react";
import PropTypes from "prop-types";
import styles from "../style/main.less";

const About = ({ exitModal }) => {
  return (
    <>
      <h2>about moonar</h2>
      <h3>why would one do such a thing?</h3>
      <p>
        Howdy! Mitchell here. I made moonar so that my lovely wife, Mollie,
        would know what kinda moon is goin' on, and when that moon might find
        itself to be full or new. Now when it is the night's time, one can most
        assuredly poke their head outside a window and peer on up into the inky
        dark of all that space. But what my app supposes is--what if sometimes
        it is daytime??? Also, it tells you what constellation the moon's in,
        zodiac-wise. Some might say that's neat.
      </p>
      <h3>what maniac would do such a thing?</h3>
      <p>
        Everything was designed, coded, and drawn by me, Mitchell Dill. You can
        find me on <a href="https://github.com/mitchelldill">Github</a> or{" "}
        <a href="https://twitter.com/mitchelldill">Twitter</a>, where I have
        been known to sometimes be.
      </p>
      <h3>how exactly has said maniac done such a thing?</h3>
      <p>
        There's a more in-depth accounting over in the{" "}
        <a href="https://github.com/MitchellDill/moonar">readme</a> on github,
        but the gist is that moonar makes a call for the lunar data it needs for
        this month and next month, which is stored in a mongoDB collection, and
        draws the necessary conclusions in its front end. The data is derived
        from lunation numbers supplied by Dark Sky, so I would be remiss not to
        mention that we're{" "}
        <a href="https://darksky.net/poweredby/">Powered By Dark Sky</a>{" "}
        {`\u2122`}. Whenever a given month's lunation data isn't found, e.g. we
        roll over to November and we don't yet have December's info, moonar
        makes a full month's worth of external API calls to Dark Sky, then
        stores that info as a new document in the database for future reference.
        Ideally, because it works a month ahead, we'll never be waiting on those
        calls when we visit the site. If literally nobody visits for several
        months, though, we might have to endure a good six or seven second's
        worth of waiting as we ring up the fine folks at Dark Sky.
      </p>
      <h3>what if i have questions beyond the scope of this about page?</h3>
      <p>
        well you could{" "}
        <a
          href="mailto:malexanderdill@gmail.com"
          title="malexanderdill@gmail.com"
        >
          email me
        </a>{" "}
        i guess.
      </p>
      <h3>you guess?</h3>
      <p>no, please, i'd love to hear from you.</p>
      <h3>
        Uh huh. This to a person who has been nothing but nice about this
        weirdly-shaped modal.
      </h3>
      <p>
        That's fair; I'll admit it's a bit much. But sometimes you just do a
        thing.
      </p>
      <h3
        onClick={e => {
          exitModal(e);
        }}
        title="click here to close the about page"
        className={styles["clickableText"]}
      >
        i would like to close this window, please.
      </h3>
    </>
  );
};

export default About;

About.propTypes = {
  exitModal: PropTypes.func.isRequired,
  exitModalAnimating: PropTypes.bool,
};
