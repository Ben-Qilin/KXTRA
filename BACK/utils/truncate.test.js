import { truncate, sortByIssuesNb, colorFromIssueNb } from "./truncate.js";

describe('truncate', () => {

    // Test 1
    test("retourne les 50 premiers caracteres suivi de ...", () => {
        const str = '1234567890123456789012345678901234567890123456789012345678901';
        const result = truncate(str);
        expect(result).toBe('12345678901234567890123456789012345678901234567890...');
    });

    test("retourne la chaine normale", () => {
        const str = '1234';
        const str2 = 'qwqweujhweougjh';
        const result = truncate(str);
        const result2 = truncate(str2)
        expect(result2).toBe('qwqweujhweougjh');
        expect(result).toBe('1234');
    });
})

// primitive = un nombre ou string = .toBe
// pour comparer l'intérieur d'un tableau ou objet = .toStrinctEqual

describe('sortByIssuesNb', () => {
    // Test 1
    test("doit trier correctement la tableau de repos en fonction du nombre d issue", () => {
        const input = [
            {
                name: 'A',
                open_issues: 563
            },
            {
                name: 'B',
                open_issues: 42
            },
            {
                name: 'C',
                open_issues: 157
            },
            {
                name: 'D',
                open_issues: 4
            },
        ]
        const output = [
            {
                name: 'D',
                open_issues: 4
            },
            {
                name: 'B',
                open_issues: 42
            },
            {
                name: 'C',
                open_issues: 157
            },
            {
                name: 'A',
                open_issues: 563
            },
        ]
        const result = sortByIssuesNb(input)
        expect(result).toStrictEqual(output)
    })
})

describe('colorFromIssueNb', () => {
    // Test 1
    test('doit renvoyer green si le nombre d issue est inferieur a 10', () => {
        const issueNb = 6
        const result = colorFromIssueNb(issueNb)
        expect(result).toBe('green')
    }),

    // Test 2
    test('doit renvoyer orange si le nombre d issue est compris entre 10 et 99', () => {
        const issueNb = 78
        const result = colorFromIssueNb(issueNb)
        expect(result).toBe('orange')
    })

    // Test 3
    test('doit renvoyer red si le nombre d issue est superieur a 100', () => {
        const issueNb = 61478
        const result = colorFromIssueNb(issueNb)
        expect(result).toBe('red')
    })
})