// products.js
import * as React from 'react';
import { List, Datagrid, TextField, Edit, SimpleForm, TextInput, NumberInput, Create, EditButton, DeleteButton, ReferenceArrayInput, SelectArrayInput } from 'react-admin';

export const ProductList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="price" />
            <TextField source="description" />
            <TextField source="imageUrl" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const ProductEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <NumberInput source="price" />
            <TextInput source="description" />
            <TextInput source="imageUrl" />
            <ReferenceArrayInput source="categoryIds" reference="categories">
                <SelectArrayInput optionText="name" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
);

export const ProductCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <NumberInput source="price" />
            <TextInput source="description" />
            <TextInput source="imageUrl" />
            <ReferenceArrayInput source="categoryIds" reference="categories">
                <SelectArrayInput optionText="name" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
);
