import { Product } from "../Model/Product";
import ItemCard from "./itemCard";

interface ListItemsProps{
  products:Product[];
}

interface ListItems {
  shopName: string;
}

export default function ListItems({products}:ListItemsProps) {
  const grupedByWarehouse = products.reduce<Record<string, Product[]>>(
    (acc, product)=>{
      if (!acc[product.warehouse]){
        acc[product.warehouse] = [];
      }
      acc[product.warehouse].push(product);
      return acc;
    }, {}
  );
  return (
    <>
      <div className=" text-3xl">Tu Carrito de Compra</div>

      <div className=" text-1x py-3 ">Lugar de compra</div>

      <div className="join join-vertical bg-base-100">
        {Object.entries(grupedByWarehouse).map(([warehouse, warehouseProducts]) => (
          <div key={warehouse} className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold">{warehouse}</div>
            <div className="collapse-content text-sm">
              {warehouseProducts.map((product) => (
                <ItemCard
                  key={product.id}
                  productName={product.productName}
                  productImage={product.productImage}
                  productPrice={product.productPrice}
                  productQuantity={product.productQuantity}
                />
              ))}
            </div>
          </div>
        ))}

        <>{/* boton de pagar*/} </>

        <div className=" text-sm">
          <button className="btn btn-block bg-primary rounded-2xl">
            <div className="col-auto">
              {" "}
              <div>Ir a Pagar</div> <div>subtotal de 19,000</div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
