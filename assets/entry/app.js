/**
 * Created by feifei on 18/3/11.
 */

import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter,Link,Route ,NavLink} from 'react-router-dom'

//import createBrowserHistory from 'history/createBrowserHistory'
//const history = createBrowserHistory();

require('../less/app.less');
import Setting from '../component/setting';


class Timer extends React.Component {
    constructor(props){
        super(props);
        //console.log(this.props);
    }
    render(){
        return(
            <div><h2>timer page</h2></div>
        )
    }
};


const About=()=>(<div><h2>About page</h2></div>);
const Message=()=>(<div><h2>Statistic page</h2></div>);



class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
            //viewMode:'Plan'
        };
        this.nav=[
            {id:1,text:'Timer',icon:'query_builder',title:'任务计时'},
            {id:2,text:'Plan',icon:'vertical_split',title:'安排任务'},
            {id:3,text:'Statistic',icon:'bar_chart',title:'统计'},
            {id:4,text:'Setting',icon:'settings',title:'设置'},
        ];
    }
    render() {
        //console.log('localStorage',localStorage);
        console.log('props ',this.props.location);
        let {location}=this.props;
        let nav_items=this.nav.map(i=>{
            let c='';
            if(location.pathname=='/'){
                if(i.text=='Timer'){
                    c='active';
                }
            }
            else {
                if(location.pathname==('/'+ i.text)){
                    c='active';
                }
            }
            return(<Link key={i.id} to={`/${i.text}`}><i className={`material-icons ${c}`}>{i.icon}</i></Link>);

        },this);

        let default_title=this.nav.find(i=>i.id==1);
        let title_str=default_title.text;
        let content_node=<div><Route extra path="/" component={Timer}/></div>;

        if(location.pathname!='/'){
            let temp=this.nav.find(i=>('/'+i.text)==location.pathname);
            title_str=temp.text;
            content_node=<div>
                <Route path="/Timer" component={Timer}/>
                <Route path="/Plan" component={About}/>
                <Route path="/Statistic" component={Message}/>
                <Route path="/Setting" component={Setting}/>
            </div>;
        }

        return (<div className="app">
            <div className="nav">
                {nav_items}
            </div>
            <div className="app_content">
                <div className="title">{title_str}</div>
                {content_node}
            </div>
        </div>);
    }
}
render(<BrowserRouter><Route path="/" component={App}></Route></BrowserRouter>, document.getElementById('app'));
