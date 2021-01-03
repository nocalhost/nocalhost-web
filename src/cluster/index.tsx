import ClusterIcon from '@material-ui/icons/Memory';

import ClusterList from './list';
import ClusterShow from './show';
import ClusterCreate from './create';
import ClusterEdit from './edit';

const resource = {
    list: ClusterList,
    create: ClusterCreate,
    show: ClusterShow,
    edit: ClusterEdit,
    icon: ClusterIcon,
};

export default resource;
