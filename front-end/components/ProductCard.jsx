export default function ProductCard() {

    return(<>
    <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
            <img src="./assets/react.svg"
            alt="alt_name"
            />
        </figure>
        <div className="card-body">
            <h2 className="card-title">cart title</h2>
            <p> description</p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary">price</button>
            </div>
        </div>

    </div>
    
    
    
    
    </>

    )
    
}