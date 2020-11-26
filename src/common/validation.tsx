import { required, email } from 'react-admin';

const validateText = [required()];
const validateEmail = [required(), email()];

export { validateEmail, validateText };
