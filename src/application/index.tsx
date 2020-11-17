import ApplicationIcon from '@material-ui/icons/Apps';

import ApplicationList from './list';
import ApplicationEdit from './edit';
import ApplicationCreate from './create';

const resource = {
    list: ApplicationList,
    create: ApplicationCreate,
    edit: ApplicationEdit,
    icon: ApplicationIcon,
};

export default resource;
