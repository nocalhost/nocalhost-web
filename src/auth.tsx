import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useDataProvider, useTranslate } from 'react-admin';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { PersonAdd, Delete, KeyboardReturn, Add } from '@material-ui/icons';
import * as _ from 'lodash';
import {
    Paper,
    Table,
    TableCell,
    TableHead,
    TableRow,
    CircularProgress,
    TableBody,
    TableContainer,
    Checkbox,
    Button,
} from '@material-ui/core';

export interface IApplication {
    id: number;
    context: {
        application_name: string;
        application_url: string;
        install_type: string;
        resource_dir: Array<string>;
        source: string;
        created_at: string;
    };
    dirs: Array<string>;
    user_id: number;
    create_at: string;
    public: number;
    status: number;
    editable: number;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    cluster_count: string;
    status: number;
    is_admin: number;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        tableHead: {
            // fontWeight: 'bold',
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
        toolBar: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: '72px',
            marginRight: '20px',
        },
        bt: {
            color: '#6f38ff',
        },
        deleteBt: {
            color: '#ff0000',
        },
        background: {
            color: '#ffffff',
            background: '#6f38ff',
            '&:hover': {
                color: '#6f38ff',
            },
        },
    })
);

const Auth: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const classes = useStyles();
    const translate = useTranslate();
    const [app, setApp] = useState<IApplication | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [isInitPage, setInitPage] = useState<boolean>(true);
    const [authUser, setAuthUser] = useState<Array<IUser>>([]);
    const [noAuthUser, setNoAuthUser] = useState<Array<IUser>>([]);
    const [selectItem, setSelectItem] = useState<Array<number>>([]);
    const dataProvider = useDataProvider();
    function onSelectAllClick(event: any) {
        const list = getList(isInitPage);
        if (event.target.checked) {
            const newSelecteds = list.map((n) => n.id);
            setSelectItem(newSelecteds);
            return;
        }
        setSelectItem([]);
    }
    function onSelectOneClick(event: any, userId: number) {
        const isSelected = checkSelected(userId);
        if (isSelected) {
            const tmpArr = selectItem.filter((id) => id !== userId);
            setSelectItem(tmpArr);
        } else {
            const tmp = _.clone(selectItem);
            tmp.push(userId);
            setSelectItem(tmp);
        }
    }
    function getList(isInitPage: boolean) {
        let result = _.cloneDeep(authUser);
        if (!isInitPage) {
            result = _.cloneDeep(noAuthUser);
        }
        return result;
    }
    function checkSelected(userId: number) {
        const isSelected = selectItem.includes(userId);
        return isSelected;
    }

    async function operateAuthUser(action: 'add' | 'delete') {
        if (selectItem.length < 1) {
            return;
        }
        if (action === 'add') {
            await dataProvider.addAuthAppUser(id, selectItem);
        } else if (action === 'delete') {
            await dataProvider.deleteAuthAppUser(id, selectItem);
        }
        setSelectItem([]);
        forceGetData();
    }

    function forceGetData() {
        dataProvider
            .getOne<IApplication>('application', { id })
            .then((res) => {
                setApp(res.data);
            })
            .catch(() => {
                setError(true);
            });
        dataProvider
            .getAuthAppUsers(id, true)
            .then((res: any) => {
                const users = res.data;
                setAuthUser(users);
            })
            .catch(() => {
                setError(true);
            });
        dataProvider
            .getAuthAppUsers(id, false)
            .then((res: any) => {
                const users = res.data;
                setNoAuthUser(users);
            })
            .catch(() => {
                setError(true);
            });
    }
    useEffect(() => {
        forceGetData();
    }, []);
    if (error) {
        return <Redirect to="/application"></Redirect>;
    }
    if (!app) {
        return (
            <div className={classes.root}>
                <CircularProgress />
            </div>
        );
    }
    return (
        <>
            <div className={classes.toolBar}>
                <Button
                    onClick={() => {
                        setSelectItem([]);
                        if (!noAuthUser) {
                            return;
                        }
                        setInitPage(!isInitPage);
                    }}
                    className={classes.bt}
                    startIcon={isInitPage ? <PersonAdd /> : <KeyboardReturn />}
                >
                    {isInitPage
                        ? translate('resources.application.auth.bt.add')
                        : translate('resources.application.auth.bt.return')}
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={
                                        selectItem.length > 0 &&
                                        selectItem.length < getList(isInitPage).length
                                    }
                                    checked={
                                        selectItem.length > 0 &&
                                        selectItem.length === getList(isInitPage).length
                                    }
                                    onChange={onSelectAllClick}
                                    inputProps={{ 'aria-label': 'select all desserts' }}
                                />
                            </TableCell>
                            <TableCell className={classes.tableHead} align="left">
                                {translate('resources.application.auth.fields.name')}
                            </TableCell>
                            <TableCell className={classes.tableHead} align="left">
                                {translate('resources.application.auth.fields.email')}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getList(isInitPage).map((user) => {
                            return (
                                <TableRow key={user.id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={checkSelected(user.id)}
                                            onChange={(event) => onSelectOneClick(event, user.id)}
                                            inputProps={{ 'aria-label': 'select all desserts' }}
                                        />
                                    </TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={classes.toolBar}>
                {isInitPage && (
                    <Button
                        onClick={() => operateAuthUser('delete')}
                        className={classes.deleteBt}
                        startIcon={<Delete />}
                    >
                        {translate('resources.application.auth.bt.delete')}
                    </Button>
                )}
                {!isInitPage && (
                    <Button
                        onClick={() => operateAuthUser('add')}
                        className={classes.background}
                        startIcon={<Add />}
                    >
                        {translate('resources.application.auth.bt.add')}
                    </Button>
                )}
            </div>
        </>
    );
};

export default Auth;
