import Nav from "@/components/Nav";
import TheamContext from "@/context/TheamContext";
import { formData } from "@/context/formData";
import { reducer } from "@/context/reducer";
import { HandleOnSelect } from "@/util/handleImageDispatch";
import { HandleListDispatch } from "@/util/handleListDispatch";
import Image from "next/image";
import React, { useContext, useReducer } from "react";
import {
  MdAvTimer,
  MdDevices,
  MdLeaderboard,
  MdPriceCheck,
} from "react-icons/md";

export const getStaticProps = async () => {
  const [formdata, trllist] = await Promise.all([
    fetch("https://api-test.innoloft.com/product/6781"),
    fetch("https://api-test.innoloft.com/trl"),
  ]);

  const [data, trlData] = await Promise.all([formdata.json(), trllist.json()]);
  return { props: { data, trlData } };
};

function Edit({ data, trlData }) {
  const appConfig = useContext(TheamContext);
  const [state, dispatch] = useReducer(reducer, formData);

  const handelOnTrlSelect = (e, item) => {
    e.preventDefault();
    dispatch({ type: "updated_trlId", payload: item.id });
    dispatch({ type: "updated_trl", payload: item.name });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    callApi(state);
  };

  const callApi = async (body) => {
    try {
      const res = await fetch("/api/saveProduct", {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        dispatch({ type: "show_message", payload: true });
        dispatch({ type: "res_message", payload: res.message });
      }
    } catch (error) {
      console.log("response", error.message);
      dispatch({ type: "show_message", payload: true });
      dispatch({ type: "res_message", payload: error.message });
    }
  };

  return (
    <div className="item-center flex flex-col">
      <Nav />
      <form
        className="productBody mt-3 flex w-full items-start justify-center self-center bg-slate-50 sm:px-0 md:w-3/5 md:pb-8"
        onSubmit={(e) => handleOnSubmit(e)}
      >
        {state.showMess ? (
          <div className="resMess flex w-full items-center justify-center bg-red-500 py-4 font-medium text-white">
            {state.resMess}
          </div>
        ) : (
          <></>
        )}

        <div className="productDetails item-center flex w-full flex-col gap-4">
          <div className="page_path_info items-center justify-between sm:flex">
            <div className="path">{`Home > Offers > Product Topic`}</div>
            <button
              type="submit"
              style={{ backgroundColor: `${appConfig.mainColor}` }}
              className="rounded-md  px-3 py-1 text-white "
            >
              Save
            </button>
          </div>
          <div className="mainSection flex flex-wrap rounded-lg bg-white p-4 shadow-md md:flex-nowrap">
            <div className="itemInfo relative flex  grow flex-col items-center justify-center gap-4 sm:items-start md:w-[70%]">
              <Image
                className="aspect-video"
                src={`${
                  state.previewPic === undefined || state.previewPic === ""
                    ? data.picture
                    : state.previewPic
                }`}
                alt="Item Image"
                width={700}
                height={250}
              />
              <div className="companylogo text-base font-normal">
                Choose a Product Picture
              </div>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => HandleOnSelect(e, "added_picture", "show_pic")}
              />
              <input
                className="w-full rounded-lg border bg-slate-100 p-2 text-lg font-normal outline-none hover:border-blue-400 focus:border-blue-400 focus:bg-white"
                type="text"
                placeholder="Title"
                value={state.title}
                onChange={(e) =>
                  dispatch({ type: "updated_title", payload: e.target.value })
                }
              />
              <input
                className="w-full rounded-lg border bg-slate-100 p-2 text-lg font-normal outline-none hover:border-blue-400 focus:border-blue-400 focus:bg-white"
                type="text"
                placeholder="Tag/Type"
                value={state.type}
                onChange={(e) =>
                  dispatch({ type: "updated_tag", payload: e.target.value })
                }
              />
              <textarea
                className="w-full rounded-lg border bg-slate-100 p-2 text-lg font-normal outline-none hover:border-blue-400 focus:border-blue-400 focus:bg-white"
                type="text"
                placeholder="Description"
                value={state.description}
                onChange={(e) =>
                  dispatch({
                    type: "updated_description",
                    payload: e.target.value,
                  })
                }
              />
            </div>
            <div className="offeredBy flex grow flex-col items-start justify-items-stretch gap-4 p-4 md:w-[30%]">
              <div className="font-bold">Offered By</div>
              <Image
                className="mt-4 h-8 w-16 sm:mt-8"
                src={`${
                  state.previewLogo === undefined || state.previewLogo === ""
                    ? data.company.logo
                    : state.previewLogo
                }`}
                alt="company logo"
                width={200}
                height={100}
              />
              <div className="companylogo text-base font-normal">
                Choose a logo
              </div>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => HandleOnSelect(e, "added_logo", "show_logo")}
              />

              <div className="location mt-4 flex w-full flex-col gap-4">
                <div className="adderss text-base font-normal">Add Address</div>
                <input
                  className="rounded-lg border bg-slate-100 p-2 text-lg font-normal outline-none hover:border-blue-400 focus:border-blue-400 focus:bg-white"
                  type="text"
                  placeholder="House No."
                  value={state.house}
                  onChange={(e) =>
                    dispatch({ type: "updated_house", payload: e.target.value })
                  }
                />
                <input
                  className="rounded-lg border bg-slate-100 p-2 text-lg font-normal outline-none hover:border-blue-400 focus:border-blue-400 focus:bg-white"
                  type="text"
                  placeholder="Street"
                  value={state.street}
                  onChange={(e) =>
                    dispatch({
                      type: "updated_street",
                      payload: e.target.value,
                    })
                  }
                />
                <input
                  className="rounded-lg border bg-slate-100 p-2 text-lg font-normal outline-none hover:border-blue-400 focus:border-blue-400 focus:bg-white"
                  type="text"
                  placeholder="City"
                  value={state.city}
                  onChange={(e) =>
                    dispatch({ type: "updated_city", payload: e.target.value })
                  }
                />
                <input
                  className="rounded-lg border bg-slate-100 p-2 text-lg font-normal outline-none hover:border-blue-400 focus:border-blue-400 focus:bg-white"
                  type="text"
                  placeholder="Country"
                  value={state.country}
                  onChange={(e) =>
                    dispatch({
                      type: "updated_country",
                      payload: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="videoSection flex flex-col items-center gap-4 rounded-sm bg-white p-4 shadow-lg">
            <div className="title self-stretch text-lg font-bold">Video</div>
            <input
              className=" w-full rounded-lg border bg-slate-100 p-2 text-lg font-normal outline-none hover:border-blue-400 focus:border-blue-400 focus:bg-white"
              type="text"
              placeholder="Youtube link/Video url"
              value={state.video}
              onChange={(e) =>
                dispatch({ type: "updated_video", payload: e.target.value })
              }
            />
          </div>

          <div className="detailsSection flex flex-col items-start rounded-sm bg-white py-4 shadow-lg">
            <div className="title p-4 text-lg font-bold">Details</div>
            <div className="details flex w-full grid-cols-2 flex-col gap-x-4 gap-y-8 p-4 sm:grid">
              <div className="tech flex flex-col gap-2">
                <div className="flex gap-4">
                  <MdDevices />
                  <div className="name">Technologies/Categories</div>
                </div>
                <input
                  className=" w-full rounded-lg border bg-slate-100 p-2 text-lg font-normal outline-none hover:border-blue-400 focus:border-blue-400 focus:bg-white"
                  type="text"
                  placeholder="Add , saprated technologies"
                  value={
                    state.categories !== undefined
                      ? state.categories.toString()
                      : ""
                  }
                  onChange={(e) => HandleListDispatch(e, "update_categories")}
                />
              </div>
              <div className="businessModel flex flex-col gap-2">
                <div className="flex gap-4">
                  <MdLeaderboard />
                  <div className="name">Business Models</div>
                </div>
                <input
                  className=" w-full rounded-lg border bg-slate-100 p-2 text-lg font-normal outline-none hover:border-blue-400 focus:border-blue-400 focus:bg-white"
                  type="text"
                  placeholder="Add , saprated business models"
                  value={
                    state.business_models !== undefined
                      ? state.business_models.toString()
                      : ""
                  }
                  onChange={(e) => HandleListDispatch(e, "updated_b_model")}
                />
              </div>
              <div className="trl flex flex-col gap-2">
                <div className="flex justify-start gap-4">
                  <MdAvTimer />
                  <div className="name">TRL</div>
                </div>
                <select
                  name="trl"
                  className="rounded-lg bg-slate-100 p-3  text-lg font-normal text-black hover:border-blue-400"
                >
                  {trlData.map((item, index) => {
                    return (
                      <option
                        key={index}
                        className="trlItem rounded- border-b border-gray-400"
                        onClick={(e) => handelOnTrlSelect(e, item)}
                      >
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="cost flex flex-col gap-2">
                <div className="flex justify-start gap-4">
                  <MdPriceCheck />
                  <div className="name">Investment Effort/Cost</div>
                </div>
                <input
                  className=" w-full rounded-lg border bg-slate-100 p-2 text-lg font-normal outline-none hover:border-blue-400 focus:border-blue-400 focus:bg-white"
                  type="text"
                  placeholder="Investment Effort/Cost"
                  value={state.investment_effort}
                  onChange={(e) => HandleListDispatch(e, "updated_cost")}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Edit;
