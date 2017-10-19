import React from 'react';
import {render} from 'react-dom';
//import request from 'request';

function getAssetPath() {
    return '/assets/';
}

/**
 *
 * @param options for request
 * @returns json object containing card data
 */
function getCards(opts) {
    const config = {
        method: 'GET',
        headers: {
            'X-Mashape-Authorization' : '6YdwHuHc8lmshKhC5pDFaaR1rZtQp11TQj9jsnEpV5IqezCqL7'
        },
        params: {
            'collectible': 1
        }
    };

    return request('https://omgvamp-hearthstone-v1.p.mashape.com/cards', config)
        .on('error', function(err) {
            console.log(err)
        })
        .pipe((response) => {
            console.log(response);
            console.log('hello');
            return response.data;
        })
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.opts = {
            'collectible': 1
        };
        this.state = {
            cards: {}
        };
    }
    componentDidMount() {
        this.setState({
            cards: getCards(this.opts)
        });
    }
    render () {
        return (
            <p> Hello React!</p>
        );
    }
}

render(<App/>, document.getElementById('app'));
