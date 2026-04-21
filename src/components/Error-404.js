import { connect } from "react-redux";

const Error404 = (props) => {
    let text = "";
    
     switch(props.info) {
        case "err":
            text = "Oh No! You are trying to do a bad thing! Please, use the back arrow to see the previous page."
        case "path":
            text = "No! No! No! You can't go there! Please, use the back arrow to see the previous page."
        case "login":                
            text = "No! No! No! You must login! Click any menu link."
        default:
           null   
        }
        
    return (
        <div className="center">
            <h1 className="colorblue">Employee Polls</h1>
            <h1 className="colorred">404 Error</h1>
            <div>
                {text}
            </div>
        </div>
    )
};

export default connect()(Error404);