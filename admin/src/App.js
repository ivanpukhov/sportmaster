import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { CategoryList, CategoryEdit, CategoryCreate } from './categories';
import { ProductList, ProductEdit, ProductCreate } from './products';
import { OrderList, OrderEdit, OrderCreate } from './orders';

const dataProvider = jsonServerProvider(' http://45.12.73.68:3555');

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="categories" list={CategoryList} edit={CategoryEdit} create={CategoryCreate} />
        <Resource name="products" list={ProductList} edit={ProductEdit} create={ProductCreate} />
        <Resource name="orders" list={OrderList} edit={OrderEdit} create={OrderCreate} />
    </Admin>
);

export default App;
