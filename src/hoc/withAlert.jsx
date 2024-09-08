import React from "react";

export const withAlert = (InnerComponent) => {
    class WrapperComponent extends React.Component {
        // componentDidMount() {
        //     alert("component mounted");
        // }
        render () {
            return <InnerComponent {...this.props} propsTambahan="hai aku HOC" />
        }
    }

    return WrapperComponent;
}

