import '../Footer/footer.scss'
import instagram from '../../assets/instagram.svg';
import linkedin from '../../assets/linkedin.svg';
import facebook from '../../assets/facebook.svg';

const Footer = () => {
    return (
        <footer role="content-info" className="footer">
            <nav className="footer__container">
                <ul>
                    <li><a href="" className="footer__link">Contact</a></li>
                    <li><a href="" className="footer__link">Comment ça marche</a></li>
                    <li><a href="" className="footer__link">Référencement</a></li>
                    <li><a href="" className="footer__link">Aide & Service clients</a></li>
                </ul>
                <ul>
                    <li><a href="" className="footer__link">Mention légale</a></li>
                    <li><a href="" className="footer__link">Terms & Conditions</a></li>
                    <li><a href="" className="footer__link">Politique de confidentialité</a></li>
                    <li><a href="" className="footer__link">Ceux que les clients en pense</a></li>
                </ul>
            </nav>
            <nav className="footer__logoLink">
                <a><img src={instagram} className="footer__img"></img></a>
                <a><img src={linkedin} className="footer__img"></img></a>
                <a><img src={facebook} className="footer__img"></img></a>
            </nav>
        </footer>
    )
}

export default Footer;