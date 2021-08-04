import { Component } from '../Component';

export class Text extends Component {
    constructor(message = '', size = '14px') {
        super('text');

        this.message = message;
        this.size = size;
    }

    getMessage() {
        return this.message;
    }

    setMessage(message) {
        this.message = message;
    }

    getSize() {
        return this.size;
    }

    /**
     *
     * @param {string} size The size of the font, e.g. '14px'
     */
    setSize(size) {
        this.size = size;
    }
}
