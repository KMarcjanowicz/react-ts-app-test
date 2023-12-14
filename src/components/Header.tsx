import Button from "./Button";

export interface Params {
    message: string,
    color?: string,
    
};

const Header = (params: Params) => {

    const onClickFunc = ():void => {
        console.log('click');
    }

    return(
        <header className="header">
            <h1 style={{color: params.color ? params.color: 'blue'}}>{params.message}</h1>
            <Button message="Add" color="green" onClickFunc={onClickFunc}/>
        </header>
    );
}

const defaultProps:Params = {
    message: "Default Message",
    color: "grey"

};
Header.defaultProps = defaultProps;

// Header.propTypes = {
//     message: PropTypes.string.isRequired
// }


export default Header;