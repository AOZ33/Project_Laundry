import React, { useState } from "react";

export const SignUpContext = React.createContext({
    title: "",
    setTitle: () => {},
});

export const SingUpContextProvider = (props) => {
   const [stateTitle, setStateTitle] = useState("Sign Up Page");
   
    return (
        <SignUpContext.Provider value={{ title: stateTitle, setTitle: setStateTitle }}>
            {props.children}
        </SignUpContext.Provider>
    )
}
export const SingUpContextConsumer = SignUpContext.Consumer;
