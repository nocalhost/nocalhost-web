import * as React from 'react';
import { useMediaQuery } from '@material-ui/core';
import {
    Show,
    ShowButton,
    SimpleShowLayout,
    RichTextField,
    DateField,
    SimpleList,
    List,
    Edit,
    Create,
    Datagrid,
    ReferenceField,
    TextField,
    EditButton,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    Filter,
} from 'react-admin';

const PostFilter = (props: any) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const PostList = (props: any) => {
    const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
    return (
        <List filters={<PostFilter />} {...props}>
            {isMobile ? (
                <SimpleList
                    primaryText={(record: any) => record.title}
                    secondaryText={(record: any) => `${record.views} views`}
                    tertiaryText={(record: any) =>
                        new Date(record.published_at).toLocaleDateString()
                    }
                />
            ) : (
                <Datagrid>
                    <TextField source="id" />
                    <ReferenceField source="userId" reference="users">
                        <TextField source="name" />
                    </ReferenceField>
                    <TextField source="id" />
                    <TextField source="title" />
                    <TextField source="body" />
                    <EditButton />
                    <ShowButton />
                </Datagrid>
            )}
        </List>
    );
};

const PostTitle = ({ record }: any) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostEdit = (props: any) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <ReferenceInput label="User" source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Create>
);

export const PostShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <TextField source="teaser" />
            <RichTextField source="body" />
            <DateField label="Publication date" source="created_at" />
        </SimpleShowLayout>
    </Show>
);
