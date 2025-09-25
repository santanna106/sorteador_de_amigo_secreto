import { RecoilBridge, RecoilRoot } from "recoil"
import ListaParticipantes from "./ListaParticipantes"
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipante";

/*Criando o Mock do participante */
jest.mock('../state/hooks/useListaDeParticipante',() => {
    return {
        useListaDeParticipantes: jest.fn()
    }
    
})  

describe('uma lista vazia de participantes', () => {
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue([])
    })

    test('deve ser renderizada sem elementos', () => {
        render(<RecoilRoot>
            <ListaParticipantes />
        </RecoilRoot>)

        const itens = screen.queryAllByRole('listitem')
        expect(itens).toHaveLength(0)

    })


})


describe('uma lista preenchida de participantes', () => {

    const participantes =  ['Ana','Catarina']
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
    })

    test('deve ser renderizada sem elementos', () => {
        render(<RecoilRoot>
            <ListaParticipantes />
        </RecoilRoot>)

        const itens = screen.queryAllByRole('listitem')
        expect(itens).toHaveLength(participantes.length)

    })


})