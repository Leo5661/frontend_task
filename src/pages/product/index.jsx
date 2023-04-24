import ItemChips from "@/components/ItemChips"
import Nav from "@/components/Nav"
import Image from "next/image"
import Link from "next/link"
import {MdDevices, MdLocationPin, MdLeaderboard, MdPriceCheck, MdAvTimer, MdLocalOffer} from "react-icons/md"
import ReactPlayer from "react-player"

export const getStaticProps = async () => {
    const res = await fetch("https://api-test.innoloft.com/product/6781");
    const data = await res.json();
    return {
        props: {
            data
        }
    }
}

function Product({data}) {
    
  return (
    <div className="flex flex-col item-center">
        <Nav />
        <div className="productBody bg-slate-50 mt-3 flex justify-center items-start px-4 sm:px-0 pb-4 sm:pb-8">
            <div className="mt-1 hidden sm:flex items-center gap-4 sm:basis-1/5">
                <Image className="w-10 rounded-full aspect-square" src={data.user.profilePicture} alt="user profile pic" width={40} height={40}/>
                <div className="info flex flex-col justify-center items-start">
                    <div className="name font-medium">{`${data.user.firstName} ${data.user.lastName}`}</div>
                    <div className="com">{data.company.name}</div>
                </div>
            </div>
            <div className="productDetails w-full flex flex-col item-center sm:basis-1/2 gap-4">
            <div className="page_path_info sm:flex justify-between items-center">
                <div className="path">
                    {`Home > Offers > Product Topic`}
                </div>
                <Link className="bg-blue-900 px-3 py-1 text-white rounded-md " href={"/product/edit"}>Edit</Link>
            </div>  
            <div className="mainSection shadow-md bg-white rounded-lg flex flex-wrap sm:flex-nowrap pb-4">
                <div className="itemInfo sm:w-[70%] relative  flex flex-col items-center sm:items-start justify-center">
                <div className="type flex justify-center items-start text-base absolute rounded-br-lg bg-white left-0 top-0 b">
                    <span className="bg-blue-900 flex justify-center rounded-br-lg rounded-tl-lg items-center p-2"><MdLocalOffer/></span>{data.type.name}
                </div>
                <Image className="aspect-video" src={data.picture} alt="Item Image" width={700} height={250}/>
                <div className="title ps-4 text-lg font-bold">
                    {data.name}
                </div>
                <div className="discription p-4 sm:p-4">
                    {data.description}
                </div>
                </div>
                <div className="offeredBy p-4 flex flex-col items-start gap-4 justify-items-stretch grow">
                    <div className="font-bold">Offered By</div>
                    <Image className="mt-4 sm:mt-8" src={data.company.logo} alt="company logo" width={200} height={100}/>
                    <div className="userInfo mt-1 flex items-center gap-4">
                        <Image className="w-10 rounded-full aspect-square" src={data.user.profilePicture} alt="user profile pic" width={40} height={40}/>
                        <div className="info flex flex-col justify-center items-start">
                            <div className="name font-medium">{`${data.user.firstName} ${data.user.lastName}`}</div>
                            <div className="com">{data.company.name}</div>
                        </div>
                    </div>
                    <div className="location flex flex-col mt-4">
                        <div className="adderss flex item-center justify-center">
                            <MdLocationPin alt="location icon" size={"1.5rem"}/>
                            <div className="place">
                                {`${data.company.address.house} ${data.company.address.street}`} <br/> ${data.company.address.city.name} ${data.company.address.country.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="videoSection shadow-lg bg-white rounded-sm flex flex-col gap-4 p-4 items-center">
                <div className="title text-lg font-bold self-stretch">
                    Video
                </div>
                <div className=" sm:w-3/4 flex justify-center items-center aspect-video">
                <ReactPlayer url={data.video} width='100%'
          height='100%'/>
                </div>
            </div>

            <div className="detailsSection shadow-lg bg-white rounded-sm flex flex-col items-start py-4">
                <div className="title p-4 text-lg font-bold">
                    Offer details
                </div>
                <div className="details flex flex-col sm:grid w-full p-4 gap-x-4 gap-y-8 grid-cols-2">
                    <div className="tech gap-2 flex flex-col">
                        <div className="flex gap-4">
                        <MdDevices />
                        <div className="name">Technologies/Categories</div>
                        </div>
                        <div className="flex flex-wrap gap-2 ps-8">
                            {
                                data.categories.map((item, index) => (
                                    <ItemChips key={index} item={item.name} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="businessModel gap-2 flex flex-col">
                        <div className="flex gap-4">
                        <MdLeaderboard />
                        <div className="name">Business Models</div>
                        </div>
                        <div className="flex flex-wrap gap-2 ps-8">
                            {
                                data.businessModels.map((item, index) => (
                                    <ItemChips key={index} item={item.name} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="trl gap-2 flex flex-col">
                        <div className="flex justify-start gap-4">
                        <MdAvTimer />
                        <div className="name">TRL</div>
                        </div>
                        <div className="flex flex-wrap gap-2 ps-8"> 
                            <ItemChips item={data.trl.name} />  
                        </div>
                    </div>
                    <div className="cost gap-2 flex flex-col">
                        <div className="flex justify-start gap-4">
                        <MdPriceCheck />
                        <div className="name">Investment Effort/Cost</div>
                        </div>
                        <div className="flex flex-wrap gap-2 ps-8"> 
                            <ItemChips item={data.investmentEffort} />  
                        </div>
                    </div>
                </div>
            </div>
            </div> 
        </div>    
    </div>
  )
}

export default Product