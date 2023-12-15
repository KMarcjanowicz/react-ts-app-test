import { Params } from "./Header";

export interface ButtonParams extends Params {
    onAdd: () => void;
};

const Button = (params: ButtonParams) => {

    return(
        <button onClick={params.onAdd} style={{ backgroundColor: params.color ? params.color: 'black' }} className="btn">{params.message}</button>
    );
}

const defaultProps:Params = {
    message: "Add"
};
Button.defaultProps = defaultProps;

export default Button;