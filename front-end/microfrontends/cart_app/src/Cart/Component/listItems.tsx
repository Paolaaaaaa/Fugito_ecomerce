import ItemCard from "./itemCard";

interface ListItems {
  shopName: string;
}

export default function ListItems() {
  return (
    <>

        <div className=" text-3xl">
          Tu Carrito de Compra
</div>

        <div className=" text-1x py-3 ">
Lugar de compra</div>


      <div className="join join-vertical bg-base-100">
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" defaultChecked />
          <div className="collapse-title font-semibold">Bodega 1</div>
          <div className="collapse-content text-sm">
            {" "}
            <ItemCard
              productName={"Tiguer special"}
              productImage={""}
              productPrice={0}
              productQuantity={0}
            ></ItemCard>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title font-semibold">Bodega 2?</div>
          <div className="collapse-content text-sm">
            {" "}
            <ItemCard
              productName={"Tiguer special"}
              productImage={""}
              productPrice={0}
              productQuantity={0}
            ></ItemCard>
          </div>
        </div>


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
