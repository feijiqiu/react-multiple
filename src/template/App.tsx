import * as React from 'react';
import './App.css';
import {WindowExt} from "../core/window-ext";
import {Content0} from "./element/content0";
interface IState {
    templateData:string[];
}
class App extends React.Component<{},IState> {
    private dom: HTMLElement | null;
    private windowParent = window.parent as WindowExt;
    constructor(props:{}){
        super(props);
        this.state = {
            templateData:['Content0','Content0','Content0']
        }
    }
    public render() {
        console.log("render");
        const {templateData} = this.state;
        const props = templateData.map((val,index) =>{
            return{
                id:val + index,
                dataSrc:{
                    dataId :val+ "-" + index
                }
            }
        });
        return (
            <div className="App"
                 ref={(c) => {
                     this.dom = c;
                 }}
            >   {
                templateData.map((val,index)=>{
                    return <Content0 key={val+index}{...props[index]}/>
                })
            }
                <button onClick={this.setData}>test click</button>
            </div>
        );
    }
    public componentWillMount() {
        console.log("componentWillMount");
        window.addEventListener('message', this.messageHandle);
    }
    public componentDidUpdate() {
        console.log("componentDidUpdate");
        this.setData();
    }
    private messageHandle = (e:any) => {
        console.log(e.data);
        debugger;
        if (e.data.type && e.data.type.indexOf('webpack') === -1) {
            window.localStorage.setItem(e.data.uid, JSON.stringify({
                id: e.data.uid,
                attributes: e.data.data,
            }));
        }
        const templateData = [] as string[];
        if(e.data.count !== this.state.templateData.length){
            for(let i=0;i<e.data.count;i++){
                templateData.push('Content0');
            }
        }
        this.setState({
            templateData
        })
        console.log("messageHandle ==========");
        console.log("messageHandle ==========");
    }
    private setData = () => {
        const editData = this.dom && getDomData( this.dom.children);
        const mdId = "mdId";
        console.log(this.dom);
        console.log(this.windowParent);
        //  const editData = getEditDomData(this.dom.children);
        // Uncaught DOMException: Failed to execute 'postMessage' on 'Window': HTMLDivElement object could not be cloned.
        // window.parent.postMessage(editData, '*');
        if (this.windowParent.receiveDomData) {
            this.windowParent.receiveDomData(editData, window, mdId);
        }
    };

}
function getDomData(children:HTMLCollection) {
    const data = {};
    const doms = Array.prototype.slice.call(children);
    doms.forEach((item:HTMLElement) =>{
        const rect = item.getBoundingClientRect();
        const dataId = item.getAttribute('data-id') as string;
        if(!dataId){
            return ;
        }
        //const tempNames = dataId.split('-');
        const tempData = {
            rect,
            // style,
            dataId,
            item,
        };
        data[dataId] = tempData;
    });
    return data;
}
export default App;
