import { validateEmail, validateUsername } from './validation';

export { validateUsername };
export { validateEmail };

export const validation = { validateEmail, validateUsername };

const defaultExport = { validation };

export default defaultExport;