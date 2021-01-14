import React, { useState, useEffect, useCallback, FC } from 'react';
import { useVersion, useDataProvider, usePermissions } from 'react-admin';
import Welcome from './Welcome';
import Users from './Users';
import Clusters from './Clusters';
import Applications from './Applications';
import { User, Cluster, Application } from '../types';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    })
);

interface State {
    users: number;
    clusters: number;
    applications: number;
    isFetch: boolean;
}

// eslint-disable-next-line react/prop-types
const Dashboard: FC = () => {
    const classes = useStyles();
    const { permissions } = usePermissions();
    const [state, setState] = useState<State>({
        users: 0,
        clusters: 0,
        applications: 0,
        isFetch: false,
    });
    const version = useVersion();
    const dataProvider = useDataProvider();
    const fetchUsers = useCallback(async () => {
        const { data } = await dataProvider.getList<User>('users', {
            filter: {},
            sort: { field: 'date', order: 'DESC' },
            pagination: { page: 1, perPage: 50 },
        });
        setState((state: State) => ({ ...state, users: data.length }));
    }, [dataProvider]);
    const fetchClusters = useCallback(async () => {
        const { data } = await dataProvider.getList<Cluster>('cluster', {
            filter: {},
            sort: { field: 'date', order: 'DESC' },
            pagination: { page: 1, perPage: 50 },
        });
        setState((state: State) => ({ ...state, clusters: data.length }));
    }, [dataProvider]);
    const fetchApplications = useCallback(async () => {
        const { data } = await dataProvider.getList<Application>('application', {
            filter: {},
            sort: { field: 'date', order: 'DESC' },
            pagination: { page: 1, perPage: 50 },
        });
        setState((state: State) => ({ ...state, applications: data.length }));
    }, [dataProvider]);

    const fetchData = () => {
        if (permissions === 'admin') {
            setState((state: State) => ({ ...state, isFetch: true }));
            fetchUsers();
            fetchClusters();
            fetchApplications();
        }
    };

    if (!state.isFetch) {
        fetchData();
    }

    useEffect(() => {
        fetchData();
    }, [version]);

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Welcome />
                </Grid>
                {permissions === 'admin' && (
                    <Grid item xs={6}>
                        <Users value={state.users} />
                    </Grid>
                )}
                {permissions === 'admin' && (
                    <Grid item xs={6}>
                        <Clusters value={state.clusters} />
                    </Grid>
                )}
                {permissions === 'admin' && (
                    <Grid item xs={12}>
                        <Applications value={state.applications} />
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default Dashboard;
