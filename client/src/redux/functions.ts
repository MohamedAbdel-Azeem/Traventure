import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetState } from "./cartSlice";

export const deleteReduxStates = () => {
    console.log("Deleting all redux states");
    const dispatch = useDispatch();
    const states = useSelector((state: any) => state);

    Object.keys(states).forEach((state) => {
        console.log(state);
        dispatch(resetState());
    });
}