import getList from './getList';
import getOne from './getOne';
import getMany from './getMany';
import getNHConfig from './getNHConfig';
import getMeshAppInfo from './getMeshAppInfo';
import * as appApi from './applications';
import deleteMethod from './delete';
import update from './update';
import create from './create';

export default {
    create,
    update,
    getList,
    getOne,
    getMany,
    getNHConfig,
    delete: deleteMethod,
    appApi,
    getMeshAppInfo,
};
