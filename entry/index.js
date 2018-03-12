/**
 * Created by feifei on 18/3/11.
 */

console.log('hi feifei');
import React from 'react';
import {render} from 'react-dom';
class HelloMessage extends React.Component {
    render() {
        return (<div>Hello World  8888</div>);
    }
}
render(<HelloMessage />, document.getElementById('app'));

