import * as React from "react";
import {WindowExt} from "../../core/window-ext";
interface IProps {
    onPost:(data:string)=>void;
}
interface IState {
    data:{[key:string]:{
        item:HTMLElement
    }};
    iframe:HTMLIFrameElement | null;
}
export class EditStageController extends React.Component<IProps,IState>{
    constructor(props:IProps){
        super(props);
        this.state = {
            data: {},
            iframe: null
        }
    }
    public componentDidMount() {
        // 接收子级里传来的 dom 数据;
        // window.addEventListener('message', this.receiveDomData);
        (window as WindowExt).receiveDomData = this.receiveDomData;
    }
    public render(){
        const {data,iframe} = this.state;
        const dataArray = data ? Object.keys(data) : [];
        const overlayChild = dataArray.length > 0 && dataArray.map((key, i) => {
            const item = data[key];
            const itemStyle = window.getComputedStyle(item.item);

            const zIndex = itemStyle.zIndex && parseInt(itemStyle.zIndex,10) ? parseInt(itemStyle.zIndex,10) :"auto";
            const height = itemStyle.height ? itemStyle.height :"auto";
            return <div
                key={key}
                id={key}
                data-key={key.split('-')[0]}
                className='edit-overlay-elm'
                style={{
                    position: 'absolute', // 设置 marign 后定位失效，用 absolute
                    top: item.item.offsetTop,
                    zIndex,
                    width: '100%',
                    height,
                }}
            >
                遮罩内容
            </div>
        });
        const iframeHeight = iframe && iframe.contentDocument
            && (iframe.contentDocument.getElementById('react-content') as HTMLElement).offsetHeight;
        const overlayHeight = iframeHeight ? iframeHeight : "0";
        return <div className= 'm-edit-stage'>
            <div className='edit-overlay' >
                <div className='edit-overlay-elm' style={{height:overlayHeight}}>
                    {overlayChild}
                </div>
            </div>
            <div style={{position:"absolute",left:"50%"}}>
                <button onClick={this.sendMessageToIframe}>click button</button>
            </div>
        </div>
    }
    private sendMessageToIframe = ()=> {
        const data = "success";
        this.props.onPost(data);
    };
    private receiveDomData = (data:any, iframe:HTMLIFrameElement, id:string) => {
        console.log("receiveDomData ");
        console.log(id);
        console.log(iframe);
        console.log(data);

        this.setState({
            data,
            iframe,
        });
    }

}