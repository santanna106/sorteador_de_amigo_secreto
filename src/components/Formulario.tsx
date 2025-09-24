import React, { useRef, useState } from 'react'
import { useAdicionarParticipante } from '../state/hooks/useAdicionarParticipante';
import { useMensagemDeErro } from '../state/hooks/useMensagemDeErro';

function Formulario() {
    const [nome,setNome] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

    const adicionarNaLista = useAdicionarParticipante()

    const mensagemDeErro = useMensagemDeErro();

    const adicionarParticipante = (evento:React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        adicionarNaLista(nome);
        setNome('');
        inputRef.current?.focus();
    }

    return (
        <form onSubmit={adicionarParticipante}>
            <input
                ref={inputRef}
                type="text"
                value={nome}
                placeholder='Insira os nomes dos participantes'
                onChange={evento => setNome(evento.target.value)}

            />
            <button disabled={!nome}>Adicionar</button>
            {mensagemDeErro && <p role='alert'>{mensagemDeErro}</p>}
        </form>
    )
}

export default Formulario