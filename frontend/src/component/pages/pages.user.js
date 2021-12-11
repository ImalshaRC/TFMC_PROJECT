import React from 'react';
import SidePanel from './pages.sidePanel';
import Header from './pages.header';
import UserTable from './content.user';

function UserManagement() {

    return (
        <div>
            <SidePanel />
            <div className="mainBody">
                <header>
                    <div className="headerWrapper">
                        <Header />
                    </div>
                </header>
                <div id="userContent">
                    <UserTable />
                </div>
            </div>
        </div>
        );
}

export default UserManagement;