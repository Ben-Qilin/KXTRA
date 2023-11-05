function getTitleByResultatsNumber(array) {
    const numberOfResults = array.length;
    if (!Array.isArray(array)) {
        return ''
    }
    if (numberOfResults === 0) {
        return 'Aucun résultat'
        // une vérification si c'est === 1 , doit retourner "Un résultat"
    } else if (numberOfResults === 1) {
        return 'Un résultat'
    }
    // une vérification si c'est plus que 1, doit retourner "XX résultats" ou XX est le nombre de résultat
    return `${numberOfResults} résultats`
}
export default getTitleByResultatsNumber;