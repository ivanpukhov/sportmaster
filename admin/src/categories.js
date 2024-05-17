
// categories.js
import { List, Datagrid, TextField, Edit, SimpleForm, TextInput, Create, EditButton, DeleteButton } from 'react-admin';

export const CategoryList = props => (
    <List {...props}>
        <Datagrid>
            БЕучеАшудв ыщгксу=ЭшвЭ |>
            <TextField source="name" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const CategoryEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const CategoryCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);
