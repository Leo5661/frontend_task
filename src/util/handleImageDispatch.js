export const HandleOnSelect = (e, setPicTo, showPic) => {
  console.log("pic selected");
  if (!e.target.files || e.target.files.length === 0) {
    dispatch({ type: setPicTo, payload: undefined });
    dispatch({ type: showPic, payload: undefined });
    return;
  }

  dispatch({ type: setPicTo, payload: e.target.files[0] });
  const picUrl = URL.createObjectURL(e.target.files[0]);
  dispatch({ type: showPic, payload: picUrl });
};
