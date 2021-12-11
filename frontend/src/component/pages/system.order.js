import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SidePanel from './pages.sidePanel';
import Header from './pages.header';
import ActiveOrderTable from './content.activeOrder';
import CompleteOrderTable from './content.completeOrder';
import DeliverOrderTable from './content.deliverOrder';
import RejectOrderTable from './content.rejectOrder';
import Demo from './content.chartOrders';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div  role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}
  
const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "theme.palette.background.paper",
    },
    bar: {
        background: "grey",
    }
}));

function OrderManagement() {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <SidePanel />
            <div className="mainBody">
                
                <header>
                    <div className="headerWrapper">
                        <Header/>
                        <div className="tabs">
                            <AppBar position="static" className={classes.bar}>
                                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                    <Tab label="Active" {...a11yProps(0)} />
                                    <Tab label="Completed" {...a11yProps(1)} />
                                    <Tab label="Delivered" {...a11yProps(2)} />
                                    <Tab label="Rejected" {...a11yProps(3)} />
                                    <Tab label="Charts" {...a11yProps(4)} />
                                </Tabs>
                            </AppBar>
                        </div>
                    </div>
                </header>

                 <div className="bodyContent">
                    <TabPanel value={value} index={0}>
                        <div className="tabContainer">
                            <ActiveOrderTable />
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className="tabContainer">
                            <CompleteOrderTable />
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div className="tabContainer">
                            <DeliverOrderTable />
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <div className="tabContainer">
                            <RejectOrderTable />
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <div className="tabContainer">
                            <Demo/>
                        </div>
                    </TabPanel>
                </div>
            </div>
        </div>
        );
}

export default OrderManagement;