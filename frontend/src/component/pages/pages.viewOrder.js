import React from 'react';
import SidePanel from './pages.sidePanel';
import Header from './pages.header';
import ViewOrderTable from './content.viewOrder';

function ViewOrder() {

        return (
            <div>
                <SidePanel />
                <div className="mainBody">
                    <header>
                        <div className="headerWrapper">
                            <Header />
                        </div>
                    </header>
                    <div id="dash_bodyContent">
                        <div className="viewOrderContent">
                            <ViewOrderTable />
                        </div>
                    </div>
                </div>
            </div>
            
        );
}

export default ViewOrder;