import '../FilteredButton/FilteredButton.scss';
import React, { useState } from 'react';

function FilteredButton() {
    const [filter, setFilter] = useState('');
    const [category, setCategory] = useState('');
    const [filtersList, setFiltersList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);

    // Ajouter un filtre
    const handleFilterSubmit = (event) => {
        event.preventDefault();
        // obligatoire d'avoir une valeur unique pour l'ajout
        if (filter.trim() !== '' && !filtersList.includes(filter)) {
            setFiltersList([...filtersList, filter]);
            setFilter('');
        }
    };

    ///Ajouter une catégorie
    const handleCategorySubmit = (event) => {
        event.preventDefault();
        // obligatoire d'avoir une valeur unique pour l'ajout
        if (category.trim() !== '' && !categoriesList.includes(category)) {
            setCategoriesList([...categoriesList, category]);
            setCategory('');
        }
    };

    // Supprimer un filtre
    const handleFilterDelete = (filterToDelete) => {
        setFiltersList(filtersList.filter(filter => filter !== filterToDelete));
    };

    // Supprimer une catégorie
    const handleCategoryDelete = (categoryToDelete) => {
        setCategoriesList(categoriesList.filter(category => category !== categoryToDelete));
    };

    return (
        <div className='filter__container'>

            <div className='title__container'>
                <h2 className='title__title'>Formulaire <span className='title__subtitle'>d'ajouts</span></h2>
            </div>

            <div className='form__container'>


                <form className='filterForm__container' onSubmit={handleFilterSubmit}>
                    <label className='form__label' htmlFor="filter">
                        Ajouter un style:
                    </label>

                    <input className='form__input' type="text" id="filter" value={filter} onChange={(event) => setFilter(event.target.value)} />

                    <button className='form__button' type="submit" value="Ajouter">Ajouter</button>

                    <p className='form__paragraphe'>Styles ajoutés:</p>
                    <ul>
                        {filtersList.map((filter, index) => (
                            <li className='form__result' key={index}>
                                {filter}
                                <button className='from__resultButton' onClick={() => handleFilterDelete(filter)}>Supprimer style</button>
                            </li>
                        ))}
                    </ul>

                </form>

                <form className='categoryForm__container' onSubmit={handleCategorySubmit}>

                    <label className='form__label' htmlFor="category">
                        Ajouter une catégorie:
                    </label>

                    <input className='form__input' type="text" id="category" value={category} onChange={(event) => setCategory(event.target.value)} />

                    <button className='form__button' type="submit" value="Ajouter">Ajouter</button>


                    <p className='form__paragraphe'>Catégories ajoutées:</p>

                    <ul>
                        {categoriesList.map((category, index) => (
                            <li className='form__result' key={index}>
                                {category}
                                <button className='from__resultButton' onClick={() => handleCategoryDelete(category)}>Supprimer catégorie</button>
                            </li>
                        ))}
                    </ul>

                </form>



            </div>
        </div>
    );
}

export default FilteredButton;
