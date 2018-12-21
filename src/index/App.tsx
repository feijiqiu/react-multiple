import * as React from 'react';
import './App.css';
import {Iframe} from "./components/Iframe";
import {EditStageController} from "./components/EditStageController";
import {EditSideMenu} from "./components/EditSideMenu";
interface IState {
    templateData: {
        type: string,
        uid: string,
        count:number
    }
}
class App extends React.Component<{},IState> {
    constructor(props:{}){
        super(props);
        this.state = {
            templateData: {
                type: 'success',
                uid: "1111111",
                count:3
            }
        };
    }
    public render() {
        const templateData = this.state.templateData;
        return (
            <div className="App">
                <div className='edit-content-wrapper'>
                    <EditSideMenu/>
                    <div className='edit-stage-wrapper'>
                        <Iframe
                            templateData={templateData}
                        />
                        <EditStageController
                            onPost={this.onPost}
                        />
                    </div>
                </div>
            </div>
        );
    }

    private onPost = (data:string) => {
        console.log(data);
        this.setState({
            templateData:{
                type:"success",
                uid:this.state.templateData.uid,
                count:this.state.templateData.count + 1
            }
        })
    }
}

export default App;
