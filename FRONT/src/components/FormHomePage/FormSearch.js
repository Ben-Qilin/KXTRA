import Filtered from '../Filtered/Filtered'
import '../FormHomePage/formSearch.scss'
import MonFormulaire from './Form'

const FormSearch = () => {
    return(
        <section className="section" id='formsearch'>
            <div className="section__categories">
              <Filtered />
            </div>
            <div className='containerForm'>
                

                    <h2 className='containerForm__title'>Réservez <span>votre moment idéal</span></h2>


                
                <MonFormulaire/>
            </div>
        </section>
    )
}

export default FormSearch