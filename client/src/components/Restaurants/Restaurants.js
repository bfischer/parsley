import React from 'react';
import { Table, Column, ButtonGroup, ButtonIcon, Badge, MenuItem } from 'react-rainbow-components';
import './Restaurants.css';

const data = [
    {
        name: 'Leandro Torres',
        company: 'nexxtway',
        email: 'leandro@gmail.com',
        status: 'verified',
        id: '1234qwerty',
    },
    {
        name: 'Jose Torres',
        company: 'Google',
        email: 'jose@gmail.com',
        status: 'verified',
        id: '1234asdfgh',
    },
    {
        name: 'Reinier',
        company: 'Nexxtway',
        email: 'reinier@gmail.com',
        status: 'verified',
        id: '1234zxcvbn',
    },
    {
        name: 'Sara',
        company: 'Nexxtway',
        email: 'sara@gmail.com',
        status: 'verified',
        id: '5678qwerty',
    },
    {
        name: 'Tahimi',
        company: 'nexxtway',
        email: 'tahimi@gmail.com',
        status: 'verified',
        id: '5678asdfgh',
    },
    {
        name: 'Carlos',
        company: 'Oracle',
        email: 'carlos@gmail.com',
        status: 'verified',
        id: '5678zxcvbn',
    },
];

const badgeStyles = { color: '#1de9b6' };
const StatusBadge = ({ value }) => <Badge label={value} variant="lightest" style={badgeStyles} />;

const Restaurants = (props) => {
    return (
        <div className="restaurants">
            <div className="page-information">
                <h1>Restaurants</h1>
                <span className="page-description">
                    View and manage your restaurants
                </span>
            </div>
            <div className="restaurants__content">
            <Table keyField="id" data={data}>
                <Column header="Name" field="name" />
                <Column header="Status" field="status" component={StatusBadge} />
                <Column header="Company" field="company" />
                <Column header="Email" field="email" />
                <Column type="action">
                    <MenuItem label="Edit" onClick={(e, data) => console.log(`Edit ${data.name}`)} className="restaurants__menu-item" />
                    <MenuItem label="Delete" onClick={(e, data) => console.log(`Delete ${data.name}`)} className="restaurants__menu-item" />
                </Column>
            </Table>
            </div>
        </div>
    )
}

export default Restaurants;