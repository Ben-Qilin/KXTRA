import smiley from '../../assets/smiley.svg'
import news from '../../assets/news.svg'
import tendance from '../../assets/tendance.svg'
import ephemere from '../../assets/ephemere.svg'
import cosy from '../../assets/cosy.svg'
import elegant from '../../assets/elegant.svg'
import insolite from '../../assets/insolite.svg'
import modern from '../../assets/moderne.svg'
import '../Filtered/Filtered.scss'

const Filtered = () => {
    return (
      
            <div className="section__categories">
                <ul className='section__catList'>
                    <li className='section__catElement'><img src={news} className='section__catImg' alt=''></img><p>Nouveautés</p></li>
                    <li className='section__catElement'><img src={tendance} className='section__catImg' alt=''></img><p>Tendances</p></li>
                    <li className='section__catElement'><img src={ephemere} className='section__catImg' alt=''></img><p>Ephémère</p></li>
                    <li className='section__catElement'><img src={insolite} className='section__catImg' alt=''></img><p>Insolite</p></li>
                    <li className='section__catElement'><img src={cosy} className='section__catImg' alt=''></img><p>Cozy</p></li>
                    <li className='section__catElement'><img src={elegant} className='section__catImg' alt=''></img><p>Elégant</p></li>

                    <li className='section__catElement'><img src={modern} className='section__catImg' alt=''></img><p>Moderne</p></li>
                </ul>

            </div>
        
    )
}

export default Filtered;