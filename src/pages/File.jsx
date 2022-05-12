import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class File extends React.Component{
    constructor(props){
        super(props);
    }    
    render(){
        const{message} = this.props;
        return(
            <div>
                {message}
                <Link to="/main">
                    main
                </Link>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
       // email:state.user.email,
        message:state.text,
    }
}
export default connect(mapStateToProps)(File);