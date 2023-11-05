import search from '../../assets/search.svg';
import '../SearchBar/SearchBar.scss';

const SearchBar = () =>{
    return(
        <>
     <div className="SearchBar__container">
                <input className="SearchBar__input" type="search" name="search" id="search" placeholder='Rechercher ...' />
                <img className='SearchBar__img' src={search} alt="" />
            </div>
        </>
    )
}

export default SearchBar;