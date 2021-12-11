import React, { Component } from 'react';
import SidePanel from '../pages.sidePanel';
import Header from '../pages.header';
import Contactustable from './contactustable';




class ContactUsData extends Component {
    
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
                        <Contactustable />
                    </div>
                </div>
            </div>
        )
    }
}

export default ContactUsData;