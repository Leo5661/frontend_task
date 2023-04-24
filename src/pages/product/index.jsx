import Nav from "@/components/Nav"
import Link from "next/link"

function Product() {
  return (
    <div>
        <Nav />
        <div className="productBody">this is product body
            
        <Link href={"/product/edit"}>Edit</Link>
            
        </div>
    </div>
  )
}

export default Product