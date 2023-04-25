import Nav from '@/components/Nav'
import { formData } from '@/context/formData'
import { reducer } from '@/context/reducer'
import { HandleOnSelect } from '@/util/handleImageDispatch'
import { HandleListDispatch } from '@/util/handleListDispatch'
import Image from 'next/image'
import React, {useReducer } from 'react'
import { MdAvTimer, MdDevices, MdLeaderboard, MdPriceCheck } from 'react-icons/md'


export const getStaticProps = async () => {

  const [formdata, trllist] = await Promise.all([
    fetch("https://api-test.innoloft.com/product/6781"),
    fetch("https://api-test.innoloft.com/trl")
  ]);

  const [data, trlData] = await Promise.all([
    formdata.json(),
    trllist.json(),
  ]);
  return {props: {data, trlData}}
}



function Edit({data, trlData}) {

  const [state, dispatch] = useReducer(reducer, formData);

  const handelOnTrlSelect = (e,item) => {
    e.preventDefault()
      dispatch({type: "updated_trlId", payload: item.id})
      dispatch({type: "updated_trl", payload: item.name})
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch({type: "submit"})
    alert("update sucessful");
  }


  return (
    <div className="flex flex-col item-center">
    <Nav />
    <form className="productBody bg-slate-50 mt-3 flex justify-center items-start self-center md:w-3/5 w-full sm:px-0 md:pb-8" onSubmit={(e) => handleOnSubmit(e)}>
        <div className="productDetails w-full flex flex-col item-center gap-4">
        <div className="page_path_info sm:flex justify-between items-center">
            <div className="path">
                {`Home > Offers > Product Topic`}
            </div>
            <button type='submit' className="bg-blue-900 px-3 py-1 text-white rounded-md ">Save</button>
        </div>  
        <div className="mainSection shadow-md bg-white rounded-lg flex flex-wrap md:flex-nowrap p-4">
            <div className="itemInfo md:w-[70%] relative  flex flex-col gap-4 items-center sm:items-start justify-center grow">
            <Image className="aspect-video" src={`${state.previewPic === undefined || state.previewPic === "" ? data.picture : state.previewPic}`} alt="Item Image" width={700} height={250}/>
            <div className="companylogo text-base font-normal">Choose a Product Picture</div>
            <input type='file' accept='image/png, image/jpeg' onChange={(e) => HandleOnSelect(e, "added_picture", "show_pic")}/>
            <input className="w-full text-lg p-2 font-normal outline-none rounded-lg border bg-slate-100 hover:border-blue-400 focus:border-blue-400 focus:bg-white" type='text' placeholder='Title' value={state.title} onChange={(e) => dispatch({type: "updated_title", payload: e.target.value})}/>
            <input className="w-full text-lg p-2 font-normal outline-none rounded-lg border bg-slate-100 hover:border-blue-400 focus:border-blue-400 focus:bg-white" type='text' placeholder='Tag/Type' value={state.type} onChange={(e) => dispatch({type: "updated_tag", payload: e.target.value})}/>
            <textarea className="w-full text-lg p-2 font-normal outline-none rounded-lg border bg-slate-100 hover:border-blue-400 focus:border-blue-400 focus:bg-white" type='text' placeholder='Description' value={state.description} onChange={(e) => dispatch({type: "updated_description", payload: e.target.value})}/>
            
            
            </div>
            <div className="offeredBy p-4 md:w-[30%] flex flex-col items-start gap-4 justify-items-stretch grow">
                <div className="font-bold">Offered By</div>
                <Image className="mt-4 sm:mt-8 h-8 w-16" src={`${state.previewLogo === undefined || state.previewLogo === "" ? data.company.logo : state.previewLogo}`} alt="company logo" width={200} height={100}/>
                <div className="companylogo text-base font-normal">Choose a logo</div>
                <input type='file' accept='image/png, image/jpeg' onChange={(e) => HandleOnSelect(e, "added_logo", "show_logo")}/>
              
                <div className="location flex w-full flex-col gap-4 mt-4">
                    <div className="adderss text-base font-normal">
                      Add Address
                    </div>
                        <input className="text-lg p-2 font-normal outline-none rounded-lg border bg-slate-100 hover:border-blue-400 focus:border-blue-400 focus:bg-white" type='text' placeholder='House No.' value={state.house} onChange={(e) => dispatch({type: "updated_house", payload: e.target.value})}/>
                        <input className="text-lg p-2 font-normal outline-none rounded-lg border bg-slate-100 hover:border-blue-400 focus:border-blue-400 focus:bg-white" type='text' placeholder='Street' value={state.street} onChange={(e) => dispatch({type: "updated_street", payload: e.target.value})}/>
                        <input className="text-lg p-2 font-normal outline-none rounded-lg border bg-slate-100 hover:border-blue-400 focus:border-blue-400 focus:bg-white" type='text' placeholder='City' value={state.city} onChange={(e) => dispatch({type: "updated_city", payload: e.target.value})}/>
                        <input className="text-lg p-2 font-normal outline-none rounded-lg border bg-slate-100 hover:border-blue-400 focus:border-blue-400 focus:bg-white" type='text' placeholder='Country' value={state.country} onChange={(e) => dispatch({type: "updated_country", payload: e.target.value})}/>
                </div>
            </div>
        </div>

        <div className="videoSection shadow-lg bg-white rounded-sm flex flex-col gap-4 p-4 items-center">
            <div className="title text-lg font-bold self-stretch">
                Video
            </div>
            <input className=" w-full text-lg p-2 font-normal outline-none rounded-lg border bg-slate-100 hover:border-blue-400 focus:border-blue-400 focus:bg-white" type='text' placeholder='Youtube link/Video url' value={state.video} onChange={(e) => dispatch({type: "updated_video", payload: e.target.value})}/>
        </div>

        <div className="detailsSection shadow-lg bg-white rounded-sm flex flex-col items-start py-4">
            <div className="title p-4 text-lg font-bold">
                Details
            </div>
            <div className="details flex flex-col sm:grid w-full p-4 gap-x-4 gap-y-8 grid-cols-2">
                <div className="tech gap-2 flex flex-col">
                    <div className="flex gap-4">
                    <MdDevices />
                    <div className="name">Technologies/Categories</div>
                    </div>
                    <input className=" w-full text-lg p-2 font-normal outline-none rounded-lg border bg-slate-100 hover:border-blue-400 focus:border-blue-400 focus:bg-white" type='text' placeholder='Add , saprated technologies' value={state.categories.toString()} onChange={(e) => HandleListDispatch(e, "update_categories")}/>
                </div>
                <div className="businessModel gap-2 flex flex-col">
                    <div className="flex gap-4">
                    <MdLeaderboard />
                    <div className="name">Business Models</div>
                    </div>
                    <input className=" w-full text-lg p-2 font-normal outline-none rounded-lg border bg-slate-100 hover:border-blue-400 focus:border-blue-400 focus:bg-white" type='text' placeholder='Add , saprated business models' value={state.business_models.toString()} onChange={(e) => HandleListDispatch(e, "updated_b_model")}/>
                    
                </div>
                <div className="trl gap-2 flex flex-col">
                    <div className="flex justify-start gap-4">
                    <MdAvTimer />
                    <div className="name">TRL</div>
                    </div>
                    <select name="trl" className='p-3 text-lg font-normal  bg-slate-100 text-black rounded-lg hover:border-blue-400'>
                      {
                        trlData.map((item, index) => {
                          return (
                            <option key={index} className="trlItem border-b border-gray-400 rounded-" onClick={(e) => handelOnTrlSelect(e,item)}>
                              {item.name}
                            </option>
                          )
                        })
                      }
                    </select>
                </div>
                <div className="cost gap-2 flex flex-col">
                    <div className="flex justify-start gap-4">
                    <MdPriceCheck />
                    <div className="name">Investment Effort/Cost</div>
                    </div>
                    <input className=" w-full text-lg p-2 font-normal outline-none rounded-lg border bg-slate-100 hover:border-blue-400 focus:border-blue-400 focus:bg-white" type='text' placeholder='Investment Effort/Cost' value={state.investment_effort} onChange={(e) => HandleListDispatch(e, "updated_cost")}/>
                    
                </div>
            </div>
        </div>
        </div> 
    </form>    
</div>
  )
}

export default Edit