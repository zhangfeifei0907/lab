/**
 * Created by feifei on 18/3/11.
 */

import React from 'react';
import {render} from 'react-dom';
class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
            arr:[
                {id:1,text:11},
                {id:12,text:12},
                {id:13,text:13},
                {id:14,text:14},
                {id:15,text:15},
                {id:16,text:16},
            ]
        }
    }
    add(){
        //let url='http://localhost:4000/all';
        //fetch(url,{mode: "no-cors"}).then(function(response) {
        //    console.log('success',response);
        //}).then(function(data) {
        //    console.log('success data',data);
        //}).catch(function(e) {
        //    console.log("Oops, error",e);
        //});
    }
    render() {
        console.log('localStorage',localStorage);

        return (<div>
            <div>
                <h1>to do list</h1>
                <button onClick={this.add}>show all user</button>
            </div>
        </div>);
    }
}
render(<App />, document.getElementById('app'));

