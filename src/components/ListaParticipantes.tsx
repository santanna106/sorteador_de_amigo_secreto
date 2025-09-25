import React from 'react'
import { useListaDeParticipantes } from '../state/hooks/useListaDeParticipante'



function ListaParticipantes() {
    const participantes = useListaDeParticipantes();
    return (
        <ul >
            {
                participantes.map(participante => <li key={participante}>{participante}</li>)
            }

        </ul>
    )
}

export default ListaParticipantes