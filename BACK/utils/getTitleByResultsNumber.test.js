import getTitleByResultsNumber from "../utils/getTitleByResultatsNumber";

// describe est purement informatif il ne test rien
describe('Fonction getTitleByResultsNumber', () => {

    test('si le tableau array est vide, il devrait retourner la String "Aucun résultat"', () => {
        const array = []
        const result = getTitleByResultsNumber(array);
        expect(result).toBe("Aucun résultat");
    });

    // Test 2
    test("retourne 'Un résultat' lorsque le tableau en parametre est de taille 1", () => {
        const array = [42];
        const result = getTitleByResultsNumber(array);
        expect(result).toBe('Un résultat');
    });

    // Test 3
    test("retourne 'X résultats' lorsque le tableau en parametre est de taille X", () => {
        const array = [42, 2737, 123, 980, 12];
        const result = getTitleByResultsNumber(array);
        expect(result).toBe(`${array.length} résultats`);
    });

    // Test 4
    test("retourne 'X résultats' lorsque le tableau en parametre est de taille X", () => {
        const array = [{ name: 'toto', issues: 40 }, { name: 'titi', issues: 12 }, { name: 'tata', issues: 213125 }];
        const result = getTitleByResultsNumber(array);
        expect(result).toBe('3 résultats');
    });

    // Test 5
    test("retourne '' lorsque le parametre n'est pas un tableau", () => {
        const array = 42;
        const result = getTitleByResultsNumber(array);
        // le résultat qui est attendu ('c'est moi qui met ce qui droit être retourné')
        expect(result).toBe('');
    });
});