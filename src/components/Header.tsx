import { useLocation } from "react-router-dom";
import Button from "./Button";

export interface Params {
    message: string,
    color?: string,
    onAdd?: () => void,
    showAdd?: boolean
};

const Header = (params: Params) => {

    const loc = useLocation();

    return(
        <header className="header">
            <h1 style={{color: params.color ? params.color: 'blue'}}>{params.message}</h1>
            {loc.pathname === '/' && (
                <Button message={ params.showAdd ? 'Close' : 'Add' } color={ params.showAdd ? 'red' : 'green' } onAdd={params.onAdd}/>
            )}
        </header>
    );
}



const defaultProps:Params = {
    message: "Default Message",
    color: "grey",
};
Header.defaultProps = defaultProps;

// Header.propTypes = {
//     message: PropTypes.string.isRequired
// }


export default Header;