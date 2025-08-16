import Product from "../../Product-Detail/product";
import Navbar from "../Components/NavBar";

export default function HomePage(){

 const productsMock = [
{
    id: crypto.randomUUID(),
    productName: "Camiseta Deportiva",
    productDescription: "Camiseta ligera y transpirable ideal para entrenamientos.",
    productCategory: "Ropa",
    productImage: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    productPrice: 79900,
  },
  {
    id: crypto.randomUUID(),
    productName: "Auriculares Inalámbricos",
    productDescription: "Sonido envolvente con cancelación de ruido y batería de 24h.",
    productCategory: "Electrónica",
    productImage: "https://images.unsplash.com/photo-1585386959984-a4155223168c",
    productPrice: 299900,
  },
  {
    id: crypto.randomUUID(),
    productName: "Silla Gamer",
    productDescription: "Diseño ergonómico con soporte lumbar y reposabrazos ajustables.",
    productCategory: "Muebles",
    productImage: "https://images.unsplash.com/photo-1598300052545-7421b04b6a9c",
    productPrice: 589900,
  },
  {
    id: crypto.randomUUID(),
    productName: "Cafetera Automática",
    productDescription: "Prepara café espresso o americano con solo presionar un botón.",
    productCategory: "Electrodomésticos",
    productImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    productPrice: 349900,
  },
  {
    id: crypto.randomUUID(),
    productName: "Zapatillas de Running",
    productDescription: "Amortiguación y ligereza para correr largas distancias.",
    productCategory: "Calzado",
    productImage: "https://images.unsplash.com/photo-1589187155470-51d5be9f37f8",
    productPrice: 199900,
  },];



    return(
        <>
        <header>

            <Navbar imagepfp= ''/>
        </header>



        <div className="grid grid-cols-3 gap-20"> {productsMock.map((p, idx) => (
        <Product
          key={idx}
          productName={p.productName}
          productDescription={p.productDescription}
          productCategory={p.productCategory}
          productImage={p.productImage}
          productPrice={p.productPrice}
        />
      ))}</div>
        
        
        </>
    );
}