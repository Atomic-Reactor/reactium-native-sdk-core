import pkg from '~/package.json';
import { io } from 'socket.io-client';
import Actinium from './lib';

class SDK {
    constructor() {
        Object.entries(Actinium).forEach(([key, value]) => (this[key] = value));

        const { serverURL } = pkg.actinium;
        if (typeof serverURL === 'string') {
            const ioURL = serverURL.replace(/^http/i, 'ws');
            this.IO = io(ioURL.replace('/api', ''), {
                path: '/actinium.io',
                autoConnect: false,
                transports: ['polling'],
            });
        }
    }

    init() {}
}

export default new SDK();
