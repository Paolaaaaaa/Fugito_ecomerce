interface ProductProps {
  productName: string;
  productDescription: string;
  productCategory: string;
  productImage: string;
  productPrice: number;
}

export default function Product({
  productName,
  productDescription,
  productCategory,
  productImage,
  productPrice,
}: ProductProps) {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img

        className="w-5 h-5"


          src={ productImage||"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" }
          alt="Shoes"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{productName}</h2>
        <p>{productDescription}</p>
        <div className="badge badge-outline">{productCategory}</div>
        <div className="card-actions flex justify-between">
      <span className="text-xl">{productPrice}</span>

                  <button className="btn btn-primary" onClick={() =>{}}>Buy Now</button>

        </div>
      </div>
    </div>
  );
}
