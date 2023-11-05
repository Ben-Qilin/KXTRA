import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Results from '../components/Results/index.js'
import data from '../components/App/data.js'

describe('Le composant Result', () => {
    test('devrait avoir autant d article que de repos recus en props', () => {
        const myData = data.items
        render(<Results repos={myData} />)
        expect(screen.queryAllByRole('article')).toHaveLength(myData.length)
    })

    test('devrait avoir 0 article que de repos recus en props', () => {
        const myData = []
        render(<Results repos={myData} />)
        expect(screen.queryAllByRole('article')).toHaveLength(myData.length)
    })
})