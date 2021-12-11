import React from 'react';
import { useHistory } from 'react-router-dom';
import Dashboard from './../../images/icon/dash.png';
import Customer from './../../images/icon/customer.png';
import Supplier from './../../images/icon/supplier.png';
import Employee from './../../images/icon/employee.png';
import Inventory from './../../images/icon/inventory.png';
import Order from './../../images/icon/orders.png';
import Finance from './../../images/icon/finance.png';
import Transport from './../../images/icon/transport.png';
import Maketing from './../../images/icon/maketing.png';
import Maintenance from './../../images/icon/maintenance.png';
import Estate from './../../images/icon/estate.png';

function SidePanel() {

    const history = useHistory();
    const loadDashboard = () => history.push('/Dashboard');
    const loadCustomerManagement = () => history.push('/CustomerManagement');
    const loadSupplierManagement = () => history.push('/SupplierManagement');
    const loadEmployeeManagement = () => history.push('/EmployeeManagement');
    const loadInventoryManagement = () => history.push('/InventoryManagement');
    const loadOrderManagement = () => history.push('/OrderManagement');
    const loadFinanceManagement = () => history.push('/FinanceManagement');
    const loadTransportManagement = () => history.push('/TransportManagement');
    const loadMaketingManagement = () => history.push('/MaketingManagement');
    const loadMaintenanceManagement = () => history.push('/MaintenanceManagement');
    const loadEstateManagement = () => history.push('/estatemanagement');

    return (
        <div className="sidePanel">
            <div className="panelContent">
                <button type="button" name="customer" onClick={loadDashboard}><img src={Dashboard} alt="Customer"/>Dashboard</button>
                <button type="button" name="customer" onClick={loadCustomerManagement}><img src={Customer} alt="Customer"/>Customer Management</button>
                <button type="button" name="supplier" onClick={loadSupplierManagement}><img src={Supplier} alt="supplier"/>Supplier Management</button>
                <button type="button" name="employee" onClick={loadEmployeeManagement}><img src={Employee} alt="employee"/>Employee Management</button>
                <button type="button" name="inventory" onClick={loadInventoryManagement}><img src={Inventory} alt="inventory"/>Inventory Management</button>
                <button type="button" name="order" onClick={loadOrderManagement}><img src={Order} alt="order"/>Order Management</button>
                <button type="button" name="finance" onClick={loadFinanceManagement}><img src={Finance} alt="finance"/>Finance Management</button>
                <button type="button" name="transport" onClick={loadTransportManagement}><img src={Transport} alt="transport"/>Transport Management</button>
                <button type="button" name="maketing" onClick={loadMaketingManagement}><img src={Maketing} alt="maketing"/>Maketing Management</button>
                <button type="button" name="maintenance" onClick={loadMaintenanceManagement}><img src={Maintenance} alt="maintenance"/>Maintenance Management</button>
                <button type="button" name="estate" onClick={loadEstateManagement}><img src={Estate} alt="estate"/>Estate Management</button>
            </div>
        </div>
        );
}

export default SidePanel;