import React, { Component } from 'react';
import SidePanel from './pages.sidePanel';
import Header from './pages.header';



class Dashboard extends Component {
    
    render() {
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
                        insert dashboard content here
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;