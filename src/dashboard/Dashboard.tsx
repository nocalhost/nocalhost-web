import React, { useState, useEffect, useCallback, FC } from 'react';
import { useVersion, useDataProvider } from 'react-admin';
import Welcome from './Welcome';
import Users from './Users';
import Clusters from './Clusters';
import Applications from './Applications';
import { User, Cluster, Application } from '../types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    data: { display: 'flex', flexDirection: 'column' },
    dataLine: { display: 'flex', marginTop: '20px' },
    spacer: { width: '20px' },
});

interface State {
    users: number;
    clusters: number;
    applications: number;
}

const Dashboard: FC = () => {
    const classes = useStyles();
    const [state, setState] = useState<State>({ users: 0, clusters: 0, applications: 0 });
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

    useEffect(() => {
        fetchUsers();
        fetchClusters();
        fetchApplications();
    }, [version]);
    return (
        <div>
            <Welcome />
            <div className={classes.data}>
                <div className={classes.dataLine}>
                    <Users value={state.users} />
                    <span className={classes.spacer}></span>
                    <Clusters value={state.clusters} />
                </div>
                <div className={classes.dataLine}>
                    <Applications value={state.applications} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
