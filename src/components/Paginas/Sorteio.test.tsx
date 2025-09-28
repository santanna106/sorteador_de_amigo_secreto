import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../../state/hooks/useListaDeParticipante";
import Sorteio from "./Sorteio";
import { useResultadoSorteio } from "../../state/hooks/useResultadoSorteio";

/*Criando o Mock do participante */
jest.mock('../../state/hooks/useListaDeParticipante', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }

})

jest.mock('../../state/hooks/useResultadoSorteio', () => {
    return {
        useResultadoSorteio: jest.fn()
    }

})


describe('a pagina de sorteio', () => {

    const participantes = [
        'Ana',
        'Catarina',
        'Jorel'
    ]

    const resultado = new Map([
        ['Ana','Jorel'],
        ['Catarina','Ana'],
        ['Jorel','Catarina']
    ])


    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
        (useResultadoSorteio as jest.Mock).mockReturnValue(resultado)
    })

    
    test('todos os participantes podem exibir o seu amigo secreto', () => {
        const participantes = ['Ana', 'Catarina', 'Jorel']
        render(<RecoilRoot>
            <Sorteio />
        </RecoilRoot>)

        const opcoes = screen.queryAllByRole('option')
        expect(opcoes).toHaveLength(participantes.length + 1) // pq já vem uma option por padrão
    })

    test('o amigo secreto é exibido quando solicitado',() => {

         render(<RecoilRoot>
            <Sorteio />
        </RecoilRoot>)

        const select = screen.getByPlaceholderText('Selecione o seu nome')

        fireEvent.change(select,{
            target: {
                value: participantes[0]
            }
        })

        const botao = screen.getByRole('button')
        fireEvent.click(botao)

        const amigoSecreto = screen.getByRole('alert')
        expect(amigoSecreto).toBeInTheDocument()




    })
})