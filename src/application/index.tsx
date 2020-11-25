import ApplicationIcon from '@material-ui/icons/Apps';

import ApplicationList from './list';
import ApplicationEdit from './edit';
import ApplicationCreate from './create';
import ApplicationShow from './show';

const resource = {
    list: ApplicationList,
    create: ApplicationCreate,
    edit: ApplicationEdit,
    show: ApplicationShow,
    icon: ApplicationIcon,
};

export default resource;
