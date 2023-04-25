import ItemChips from "@/components/ItemChips";
import Nav from "@/components/Nav";
import Image from "next/image";
import Link from "next/link";
import {
  MdDevices,
  MdLocationPin,
  MdLeaderboard,
  MdPriceCheck,
  MdAvTimer,
  MdLocalOffer,
} from "react-icons/md";
import ReactPlayer from "react-player";

export const getStaticProps = async () => {
  const res = await fetch("https://api-test.innoloft.com/product/6781");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};

function Product({ data }) {
  return (
    <div className="item-center flex flex-col">
      <Nav />
      <div className="productBody mt-3 flex items-start justify-center bg-slate-50 px-4 pb-4 sm:px-0 sm:pb-8">
        <div className="mt-1 hidden items-center gap-4 sm:flex sm:basis-1/5">
          <Image
            className="aspect-square w-10 rounded-full"
            src={data.user.profilePicture}
            alt="user profile pic"
            width={40}
            height={40}
          />
          <div className="info flex flex-col items-start justify-center">
            <div className="name font-medium">{`${data.user.firstName} ${data.user.lastName}`}</div>
            <div className="com">{data.company.name}</div>
          </div>
        </div>
        <div className="productDetails item-center flex w-full flex-col gap-4 sm:basis-1/2">
          <div className="page_path_info items-center justify-between sm:flex">
            <div className="path">{`Home > Offers > Product Topic`}</div>
            <Link
              className="rounded-md bg-blue-900 px-3 py-1 text-white "
              href={"/product/edit"}
            >
              Edit
            </Link>
          </div>
          <div className="mainSection flex flex-wrap rounded-lg bg-white pb-4 shadow-md sm:flex-nowrap">
            <div className="itemInfo relative flex  flex-col items-center justify-center sm:w-[70%] sm:items-start">
              <div className="type b absolute left-0 top-0 flex items-start justify-center rounded-br-lg bg-white text-base">
                <span className="flex items-center justify-center rounded-br-lg rounded-tl-lg bg-blue-900 p-2">
                  <MdLocalOffer />
                </span>
                {data.type.name}
              </div>
              <Image
                className="aspect-video"
                src={data.picture}
                alt="Item Image"
                width={700}
                height={250}
              />
              <div className="title ps-4 text-lg font-bold">{data.name}</div>
              <div className="discription p-4 sm:p-4">{data.description}</div>
            </div>
            <div className="offeredBy flex grow flex-col items-start justify-items-stretch gap-4 p-4">
              <div className="font-bold">Offered By</div>
              <Image
                className="mt-4 sm:mt-8"
                src={data.company.logo}
                alt="company logo"
                width={200}
                height={100}
              />
              <div className="userInfo mt-1 flex items-center gap-4">
                <Image
                  className="aspect-square w-10 rounded-full"
                  src={data.user.profilePicture}
                  alt="user profile pic"
                  width={40}
                  height={40}
                />
                <div className="info flex flex-col items-start justify-center">
                  <div className="name font-medium">{`${data.user.firstName} ${data.user.lastName}`}</div>
                  <div className="com">{data.company.name}</div>
                </div>
              </div>
              <div className="location mt-4 flex flex-col">
                <div className="adderss item-center flex justify-center">
                  <MdLocationPin alt="location icon" size={"1.5rem"} />
                  <div className="place">
                    {`${data.company.address.house} ${data.company.address.street}`}{" "}
                    <br /> ${data.company.address.city.name} $
                    {data.company.address.country.name}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="videoSection flex flex-col items-center gap-4 rounded-sm bg-white p-4 shadow-lg">
            <div className="title self-stretch text-lg font-bold">Video</div>
            <div className=" flex aspect-video items-center justify-center sm:w-3/4">
              <ReactPlayer url={data.video} width="100%" height="100%" />
            </div>
          </div>

          <div className="detailsSection flex flex-col items-start rounded-sm bg-white py-4 shadow-lg">
            <div className="title p-4 text-lg font-bold">Offer details</div>
            <div className="details flex w-full grid-cols-2 flex-col gap-x-4 gap-y-8 p-4 sm:grid">
              <div className="tech flex flex-col gap-2">
                <div className="flex gap-4">
                  <MdDevices />
                  <div className="name">Technologies/Categories</div>
                </div>
                <div className="flex flex-wrap gap-2 ps-8">
                  {data.categories.map((item, index) => (
                    <ItemChips key={index} item={item.name} />
                  ))}
                </div>
              </div>
              <div className="businessModel flex flex-col gap-2">
                <div className="flex gap-4">
                  <MdLeaderboard />
                  <div className="name">Business Models</div>
                </div>
                <div className="flex flex-wrap gap-2 ps-8">
                  {data.businessModels.map((item, index) => (
                    <ItemChips key={index} item={item.name} />
                  ))}
                </div>
              </div>
              <div className="trl flex flex-col gap-2">
                <div className="flex justify-start gap-4">
                  <MdAvTimer />
                  <div className="name">TRL</div>
                </div>
                <div className="flex flex-wrap gap-2 ps-8">
                  <ItemChips item={data.trl.name} />
                </div>
              </div>
              <div className="cost flex flex-col gap-2">
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
  );
}

export default Product;
