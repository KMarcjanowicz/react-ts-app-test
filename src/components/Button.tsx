import { MouseEventHandler } from "react";
import { Params } from "./Header";

export interface ButtonParams extends Params {
    onClickFunc: MouseEventHandler<HTMLButtonElement>
};

const Button = (params: ButtonParams) => {

    return(
        <button onClick={params.onClickFunc} style={{ backgroundColor: params.color ? params.color: 'black' }} className="btn">{params.message}</button>
    );
}

const defaultProps:Params = {
    message: "Add"
};
Button.defaultProps = defaultProps;

export default Button;