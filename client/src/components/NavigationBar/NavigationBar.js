import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { VerticalNavigation, VerticalSection, VerticalItem } from 'react-rainbow-components';
import './NavigationBar.css';

const NavigationBar = (props) => {
    const [selectedPage, setSelectedPage] = React.useState(props.location.pathname);

    const handleSelect = (e, page) => {
        setSelectedPage(page);
        props.history.push(page);
    }

    if(!props.auth.isAuthenticated) {
        return null;
    }

    return (
        <div className="navigation-bar">
            <VerticalNavigation
                    selectedItem={selectedPage}
                    onSelect={(handleSelect)}
                >
                <VerticalSection label="GETTING STARTED">
                    <VerticalItem name="/dashboard" label="Dashboard" />
                    <VerticalItem name="/restaurants" label="Restaurants" />
                    <VerticalItem name="/users" label="Users" />
                </VerticalSection>
                <VerticalSection label="FOLDERS">
                    <VerticalItem name="item-5" label="Created by Me" />
                    <VerticalItem name="item-6" label="Shared with Me" />
                </VerticalSection>
            </VerticalNavigation>
        </div>
    )
}

const mapStateToProps =(state) => ({
    auth: state.auth,
})

export default withRouter(connect(mapStateToProps)(NavigationBar));