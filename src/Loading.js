import React from 'react';
import "./Loader.css";

class Loading extends React.Component {
    render() {
        return <div className="lds-css ng-scope">
            <div style={{width: "100%", height: "100%"}} className="lds-rolling">
                <div/>
            </div>
        </div>
    }
}

export default Loading;