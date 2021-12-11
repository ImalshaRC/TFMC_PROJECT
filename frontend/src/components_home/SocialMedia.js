import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import './css/social.css';


export default function SocialMedia() {

  return (
    <div class="social">
        <h6 class="sociallink">Social Media Links</h6>
      <Tooltip title="Instagram">
        <IconButton aria-label="Instagram">
          <InstagramIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Facebook">
        <IconButton aria-label="Facebook">
          <FacebookIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Twitter">
        <IconButton aria-label="Twitter">
          <TwitterIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="LinkedIn">
        <IconButton aria-label="LinkedIn">
          <LinkedInIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}
