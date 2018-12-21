import * as React from "react";
import "./index.css";
interface IProps {
    dataSrc:{
        dataId:string;
    }
    id:string
}
export class Content0 extends React.Component<IProps>{
    public render(){
        const {id,dataSrc:{dataId}} = this.props;
        return (
            <div
                className="m-content-0"
                id={id}
                data-id={dataId}
            >
                内容块1
            </div>
        );
    }
}