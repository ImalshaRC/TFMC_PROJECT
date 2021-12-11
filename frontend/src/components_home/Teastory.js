import React, {  useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import './css/sample.css';
import Aos from 'aos';
import "aos/dist/aos.css";

const Teastory = () => {
    useEffect(()=>{
        Aos.init({duration:1500});
    }, []);


        return (
            <div class="contactusform">
            <div class="storydivision" >
                <h2 class="section-title" id="thestory"> Tea Story</h2>
                <hr/>
                <div data-aos="fade-up">
                <Typography variant="h4" gutterBottom align="center">
                From Leaf to Sip
                </Typography>
                <Typography variant="button" display="block" gutterBottom align="center">
                No greater love story was ever brewed
                </Typography>
                <Typography variant="body1" gutterBottom align="center">
                From handpicking the choicest leaves to its withering and rolling; from blowing it cold and hot for that tangy personality,
                until we separate the finest for you – Ceylon Tea is a labor of love.
                </Typography>
                <br/>
                </div>

                <div data-aos="fade-right">
                <Typography variant="h6" gutterBottom align="left">
                Love at first pluck
                </Typography>
                <Typography variant="button" display="block" gutterBottom align="left">
                The chosen leaves
                </Typography>
                <Typography variant="body1" gutterBottom align="left">
                The first secret is in the art of plucking. To ensure the excellence of the final product, 
                <br/>skilled hands aided by trained eyes pluck only unopened buds accompanied by two leaves <br/>
                sprouting from the springs of each tea bush.
                </Typography>
                <br/>
                </div>

                <div data-aos="fade-left">
                <Typography variant="h6" gutterBottom align="right">
                Preparing for the long run
                </Typography>
                <Typography variant="button" display="block" gutterBottom align="right">
                The withering
                </Typography>
                <Typography variant="body1" gutterBottom align="right">
                These chosen leaves are then brought in baskets to the factory and placed on troughs to dry and wither,<br/>
                 just as wine is deposited in casks to mature until perfection.<br/>
                  Air is circulated to decrease their moisture content to optimum levels<br/>
                   to enhance their aromatic appeal and flavor.
                </Typography>
                <br/>
                </div>

                <div  data-aos="fade-right">
                <Typography variant="h6" gutterBottom align="left">
                Finding the heart of the flavor
                </Typography>
                <Typography variant="button" display="block" gutterBottom align="left">
                The rolling
                </Typography>
                <Typography variant="body1" gutterBottom align="left">
                Once the withering process is finally through and done, the withered leaves enter the third stage.<br/>
                 It’s called rolling. They are fed to rolling machines to break their stubborn cell<br/>
                  structures of resistance, to open their hearts and seduce<br/>
                   them to release the natural essence contained within.
                </Typography>
                <br/>
                </div>

                <div data-aos="fade-left">
                <Typography variant="h6" gutterBottom align="right">
                Things are heating up
                </Typography>
                <Typography variant="button" display="block" gutterBottom align="right">
                Blow cold, blow hot
                </Typography>
                <Typography variant="body1" gutterBottom align="right">
                Next, they must go through fermentation, the process of oxidation;<br/>
                exposed to air which will brown them to a perfect tan. Then after being blown cold 
                they must be blown hot.<br/> They must go through the furnace of fire, pass through a chamber of hot air, and emerge<br/> with the mettle of their flavor tried, tested and proven. It’s this that will set them apart
                </Typography>
                <br/>
                </div>

                <div data-aos="fade-right">
                <Typography variant="h6" gutterBottom align="left">
                Let the ceremony begin
                </Typography>
                <Typography variant="button" display="block" gutterBottom align="left">
                The final preparation
                </Typography>
                <Typography variant="body1" gutterBottom align="left">
                The tea is still not ready for your cup.<br/>
                The tea is now placed on a vibrating mesh and sorted according to size and grades,<br/>
                before they are weighed and packed separately to be presented to the world<br/>
                 as the pride of Ceylon Tea: the enchantment that will fill your cup.

                </Typography>
                <br/>
                </div>

            </div>
            </div>
        );
    }

export default Teastory;