import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import '../../styles.css'
import Header from './pages.header';
import SidePanel from './pages.sidePanel';
import ProductTable from './inventoryTable/ProductTable';
import MaterialTable from './inventoryTable/MaterialTable';
import SafetyStockTable from './inventoryTable/SafetyStockTable';
import DeadStockTable from './inventoryTable/DeadStockTable';
import DamgedStockTable from './inventoryTable/DamagedStock';
import Dashboard from './inventoryTable/Dashboard';

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

function InventoryManagement() {

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
                        <Header />
                        <div className="tabs">
                            <AppBar position="static" className={classes.bar}>
                                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                    <Tab label="Dashboard" {...a11yProps(0)} />
                                    <Tab label="Products" {...a11yProps(1)} />
                                    <Tab label="Materials" {...a11yProps(2)} />
                                    <Tab label="Safety Stock" {...a11yProps(3)} />
                                    <Tab label="Dead Stock" {...a11yProps(4)} />
                                    <Tab label="Damaged Stock" {...a11yProps(5)} />
                                </Tabs>
                            </AppBar>
                        </div>
                    </div>
                </header>

                 <div className="bodyContent">
                    <TabPanel value={value} index={0}>
                        <Dashboard />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                          <ProductTable />  
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <MaterialTable />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <SafetyStockTable />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <DeadStockTable />
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <DamgedStockTable />
                    </TabPanel>
                </div>

                <footer>
                    <div className="footerWrapper">
                    </div>
                </footer>

            </div>
        </div>
        );
}

export default InventoryManagement;