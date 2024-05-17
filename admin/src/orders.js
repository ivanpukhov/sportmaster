// orders.js
import * as React from 'react';
import { List, Datagrid, TextField, Edit, SimpleForm, TextInput, Create, EditButton, DeleteButton, ArrayInput, SimpleFormIterator, NumberInput } from 'react-admin';

export const OrderList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="phoneNumber" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const OrderEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="phoneNumber" />
            <ArrayInput source="items">
                <SimpleFormIterator>
                    <NumberInput source="productId" />
                    <NumberInput source="quantity" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

export const OrderCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="phoneNumber" />
            <ArrayInput source="items">
                <SimpleFormIterator>
                    <NumberInput source="productId" />
                    <NumberInput source="quantity" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);
