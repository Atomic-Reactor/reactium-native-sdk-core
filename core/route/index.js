import op from 'object-path';
import Registry from '../utils/registry';

class Route extends Registry {
    constructor() {
        super('router', 'id', Registry.MODES.CLEAN);
        this.__nav = null;
    }

    register(id, data = {}) {
        const reqs = ['name', 'component'];
        const err = reqs.reduce((e, key) => {
            e += !op.get(data, key) ? 1 : 0;
            return e;
        }, 0);

        if (err > 0) {
            throw new Error(
                'Route.register() error. Data object must define the name and component values',
            );
        } else {
            super.register(id, data);
        }
    }

    get navigation() {
        return this.__nav;
    }

    set navigation(value) {
        this.__nav = value;
    }
}

export default new Route('router');
