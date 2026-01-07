export default function MainLayout() {
  return (
    <div>
      <div className="navbar bg-primary shadow-sm">
        <div className="navbar-start">
          <div className="flex-2">
            <a className="btn btn-ghost text-xl">Fugito ecomerce</a>
          </div>
        </div>
        <div className="navbar-center">
          <ul className="menu menu-horizontal px-1">
            <li className="btn  btn-primary">
              <a>Home</a>
            </li>
          </ul>
          <ul className="menu menu-horizontal px-1">
            <li className="btn  btn-primary">
              <a>Productos</a>
            </li>
          </ul>
          <ul className="menu menu-horizontal px-1">
            <li className="btn  btn-primary">
              <a>Carrito</a>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          {" "}
          <div className="dropdown dropdown-end">
            {" "}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {" "}
              <div className="w-10 rounded-full">
                {" "}
                <img
                  alt="Login Icon"
                  src="https://img.icons8.com/material-outlined/24/user--v1.png"
                />{" "}
              </div>{" "}
            </div>{" "}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {" "}
              <li>
                <a>Login</a>
              </li>{" "}
              <li>
                <a>SignUp</a>
              </li>{" "}
            </ul>{" "}
          </div>{" "}
        </div>
      </div>
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Fugito-ecomerce
          </p>
        </aside>
      </footer>
    </div>
  );
}
