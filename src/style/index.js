import op from 'object-path';
import Registry from '../utils/registry';

class Style extends Registry {
    constructor() {
        super('style', 'id', Registry.MODES.CLEAN);
    }
}

export default new Style();
