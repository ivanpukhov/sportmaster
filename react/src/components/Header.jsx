import logo from '../logo.svg';
import burger from '../img/burger.svg';
import cart from '../img/ion_cart.svg';
import heart from '../img/heart.svg';
import {Link} from "react-router-dom";
import Search from "./Search";

function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header__block">
                    <Link to={'/'} className="header__logo">
                        <img src={logo} alt=""/>
                    </Link>
                    <div className="header__btn">
                        <div className="header__btn-icon">
                            <img src={burger} alt=""/>
                        </div>
                        <Link to={'/category'} className="header__btn-text">
                            Каталог
                        </Link>
                    </div>
                    <Search/>
                    <Link to={'/cart'} className="header__btn">
                        <div className="header__btn-icon">
                            <img src={cart} alt=""/>
                        </div>
                        <div className="header__btn-text">
                            Корзина
                        </div>
                    </Link>

                </div>
            </div>
        </header>
    );
}

export default Header;
