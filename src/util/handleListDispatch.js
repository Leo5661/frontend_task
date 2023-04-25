export const HandleListDispatch = (e, action) => {
    let str = e.target.value;
    let temp = new Array();
    temp = str.split(",")
    dispatch({type: action, payload: temp});
} 