import * as React from "react";
interface IProps {
    templateData:{
        type: string,
        uid: string,
        count:number
    };
}
export class Iframe extends React.Component<IProps,{}> {
    private iframe: HTMLIFrameElement| null;
    public componentWillReceiveProps(nextProps:IProps) {
        console.log(nextProps);
        const { templateData } = nextProps;
        const { type } = templateData;
        if (type === 'success'
            && this.iframe && this.iframe.contentWindow
            && this.iframe.contentWindow.postMessage) {
            // 与 iframe 通信；
            this.iframe.contentWindow.postMessage(templateData, '*');
        }
    }
    public render() {

        const {templateData} = this.props;
        const { type, uid } = templateData;
        const location = window.location;
        const protocol = location.protocol;
        const isLocalMode = location.port;
        const port = isLocalMode ? ':3000' : '';
        const mainPath = isLocalMode ? '' : '/templates';
      //  let iframeSrc = `${protocol}//${location.hostname}${port}${mainPath}/#isEdit=true`;
        let iframeSrc = `${protocol}//${location.hostname}${port}${mainPath}`;
        if (type === 'success') {
            // 通过路由刷新 iframe 里 props;
            // iframeSrc = `${protocol}//${location.hostname}${port}${mainPath}/#uid=${uid}&isEdit=true`;
            iframeSrc = `${protocol}//${location.hostname}${port}${mainPath}/#uid=${uid}`;
        }
        iframeSrc = "http://localhost:3000/template.html"
        return (
            <iframe
                className= 'm-iframe'
                src={iframeSrc}
                title="template"
                onLoad={this.getData}
                id="myIframe"
                ref={this.initIframe}
            />
        );
    }
    private getData = ()=>{
        console.log('iframe  onLoad getData')
    };
    private initIframe = (iframe:HTMLIFrameElement)=>{
        console.log('initIframe',iframe);
        this.iframe = iframe;
    };
}