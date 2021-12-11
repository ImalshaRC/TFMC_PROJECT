import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './styles.css';
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-toastify/dist/ReactToastify.css';
import InventoryManagement from './component/pages/system.inventory';
import InventoryAddProduct from './component/forms/create/InventoryAddProduct';
import InventoryUpdateProduct from './component/forms/update/InventoryUpdateProduct';
import InventoryAddMaterial from './component/forms/create/InventoryAddMaterial';
import InventoryUpdateMaterial from './component/forms/update/InventoryUpdateMaterial';
import InventoryAddSafetySet from './component/forms/create/InventoryAddSafetySet';
import InventoryUpdateSafetySet from './component/forms/update/InventoryUpdateSafetySet';
import InventoryAddDeadSet from './component/forms/create/InventoryAddDeadSet';
import InventoryUpdateDeadSet from './component/forms/update/InventoryUpdateDeadSet';
import InventoryAddDamageSet from './component/forms/create/InventoryAddDamageSet';
import InventoryUpdateDamageSet from './component/forms/update/InventoryUpdateDamageSet';
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Dashboard from './component/pages/pages.dashboard';
import ContactUsData from './component/pages/contactusContent/pages.contactus'
import CustomerManagement from './component/pages/system.customer';
import OrderManagement from './component/pages/system.order';
import Profile from './component/pages/pages.profile';
import UpdateProfile from './component/forms/update/updateUser.component';
import ChangePassword from './component/forms/update/updatePassword.component';
import CreateCustomer from './component/forms/create/createCustomer.component';
import CreateCorporate from './component/forms/create/createCorporate.component';
import CreateUser from './component/forms/create/createUser.component';
import UserManagement from './component/pages/pages.user';
import UpdateCustomer from './component/forms/update/updateCustomer.component';
import CreateOrder from './component/forms/create/createOrder.component';
import ViewOrder from './component/pages/pages.viewOrder';
import UpdateOrder from './component/forms/update/updateOrder.component';
import Login from './component/forms/login/login.component';
import HomeTest from './component/pages/EmployeeList';
import AddUser from './component/forms/create/AddUser';
import EditUser from './component/forms/update/EditUser';
import User from './component/pages/User';
import Attendance from './component/forms/create/Attendance';
import TodayAttds from './component/pages/TodayAttds';
import EditAttds from './component/forms/update/EditAttds';
import GenQR from './component/pages/GenQR';
import EmployeeManagement from "./component/pages/CustomerManagement";
import ViewCustomer from "./component/pages/pages.viewCustomer";
import AddStaff from "./component/forms/create/AddStaff";
import StaffList from "./component/pages/StaffList";
import EstateManagement from "./component/pages/EstateManagement";
import EditStaff from "./component/forms/update/EditStaff";
import AddEstate from "./component/forms/create/AddEstate";
import EstateList from "./component/pages/EstateList";
import EditEstate from "./component/forms/update/EditEstate";


function App() {
  return (
    <Router>
        <Switch>

            <Route path="/Home" component={Home}/> 

            <Route path="/Login" exact component = {Login} />

            {/*------------------------- Create -------------------------*/}
            <Route path="/CreateUser" exact component = {CreateUser} />
            <Route path="/CreateCustomer" exact component = {CreateCustomer} />
            <Route path="/CreateCorporate" exact component = {CreateCorporate} />
            <Route path="/PlaceAnOrder/:id" exact component = {CreateOrder} />

            {/*------------------------- Update -------------------------*/}
            <Route path="/UpdateCustomer/:id" exact component = {UpdateCustomer} />
            <Route path="/UpdateOrder/:id" exact component = {UpdateOrder} />
            <Route path="/UpdateAccount/:id" exact component = {UpdateProfile} />

            {/*------------------------- Pages -------------------------*/}
            <Route path="/Dashboard" exact component = {Dashboard} />
            <Route path="/ViewOrder/:id" exact component = {ViewOrder} />
            <Route path="/ViewCustomer/:id" exact component = {ViewCustomer} />
            <Route path="/CustomerManagement" exact component = {CustomerManagement} />
            <Route path="/OrderManagement" exact component = {OrderManagement} />
            <Route path="/contactusdata" exact component = {ContactUsData} />

            {/*------------------------- User Handling -------------------------*/}
            <Route path="/MyAccount" exact component = {Profile} />
            <Route path="/UserManagement" exact component = {UserManagement} />
            <Route path="/ChangePassword" exact component = {ChangePassword} />

            <Route path="/inventorymanagement" exact component = {InventoryManagement} />
            <Route path="/inventorymanagement/inventoryaddproduct" component = {InventoryAddProduct} />
            <Route path="/inventorymanagement/inventoryupdateproduct/:id" component = {InventoryUpdateProduct} />
            <Route path="/inventorymanagement/inventoryaddmaterial" component={InventoryAddMaterial} />
            <Route path="/inventorymanagement/inventoryupdatematerial/:id" component={InventoryUpdateMaterial} />
            <Route path="/inventorymanagement/inventoryaddsafetyset" component={InventoryAddSafetySet} />
            <Route path="/inventorymanagement/inventoryupdatesafetyset/:id" component={InventoryUpdateSafetySet} />
            <Route path="/inventorymanagement/inventoryadddeadset" component={InventoryAddDeadSet} />
            <Route path="/inventorymanagement/inventoryupdatedeadset/:id" component={InventoryUpdateDeadSet} />
            <Route path="/inventorymanagement/inventoryadddamageset" component={InventoryAddDamageSet} />
            <Route path="/inventorymanagement/inventoryupdatedamageset/:id" component={InventoryUpdateDamageSet} />
            <Route path="/explore" component={Explore} />

            <Route path="/employeeManagement" exact component={EmployeeManagement}></Route>
            <Route path="/attendance/:id" exact component={Attendance}></Route>
            <Route path="/test" exact component={HomeTest}></Route>
            <Route path="/test-add" exact component={AddUser}></Route>
            <Route path="/test-edit/:id" exact component={EditUser}></Route>
            <Route path="/User/:id" exact component={User}></Route>
            <Route path="/qr" exact component={GenQR}></Route>
            <Route path="/todayattds" exact component={TodayAttds}></Route>
            <Route path="/editattds/:id" exact component={EditAttds}></Route>


            <Route path="/estatemanagement" exact component={EstateManagement}></Route>
            <Route path="/adduser" exact component={AddStaff}></Route>
            <Route path="/allstaff" exact component={StaffList}></Route>
            <Route path="/editstaff/:id" exact component={EditStaff}></Route>
            <Route path="/addestate" exact component={AddEstate}></Route>
            <Route path="/allestate" exact component={EstateList}></Route>
            <Route path="/editestate/:id" exact component={EditEstate}></Route>

        </Switch>
    </Router>
  );
}

export default App;
