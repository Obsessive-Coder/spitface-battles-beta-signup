import { validateEmail, validateUsername, validatePassword } from './validation';

export { validateUsername };
export { validateEmail };
export { validatePassword };

export const validation = { validateEmail, validateUsername, validatePassword };

const defaultExport = { validation };

export default defaultExport;