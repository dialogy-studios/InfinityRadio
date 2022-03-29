import React from "react";
import InternetConnectionErrorScreen from "../../../InternetConnectionErrorScreen";
interface Props {
    message: string,
    retryAction: (() => void) | null
}

const Error: React.FC<Props> = (props) => {
    return (
       <InternetConnectionErrorScreen
           {...props}
       />
    )
}

export default Error;
