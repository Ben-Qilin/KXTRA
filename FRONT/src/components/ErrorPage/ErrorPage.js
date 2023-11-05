import '../ErrorPage/ErrorPage.scss';

const ErrorPage = () => {
    return (
        
        <div className="error__container">
            <h2 className="error__title">404</h2>
           
            <p className="error__text">La page que vous recherchez est <span className="error__text__subtitle">introuvable</span>.</p>
        </div>
    )
}

export default ErrorPage;