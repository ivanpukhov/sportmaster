import logo from '../logo.svg';

function Footer() {
    return (
        <footer className='footer'>
            <div className="container">
                <div className="footer__top">
                    <img src={logo} alt=""/>
                </div>
            </div>
            <div className="footer__bottom">
                <div className="container">
                    «Спортмастер» является зарегистрированным товарным знаком The Sport & Fashion Management, Pte
                    <br/>© 2003-2024 ТОО «Спортмастер Казахстан». Все права защищены.
                </div>
            </div>

        </footer>
    );
}

export default Footer;
