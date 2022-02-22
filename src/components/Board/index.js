import React from "react";
import { Container } from './styles';
import List from '../List';
import { loadLists } from '../../services/api'
import { useState } from 'react';
import BoardContext from "./context";
import produce from 'immer';

const data = loadLists();

export default function Board() {
    const [lists, setlists] = useState(data);

    function move(fromList, toList, from, to) {
        setlists(produce(lists, draft => {
            const dragged = draft[fromList].cards[from];
            //acessei a Lista depois acessei a parte Cards e dentro eu busquei o card especifico
            draft[fromList].cards.splice(from, 1);
            //removendo esse item que ta sendo arrastado da lista
            draft[toList].cards.splice(to, 0, dragged);
            //coloquei zero para ser colocado antes do item 1, e o dragged é que ele esta colando o objeto que esta sendo arrastado
            //Quando estava from list no lugar da função , ele procurava dentro da lista que estava o objeto agarrado, agora com o toList , ele procura dentro da da lista do objeto que vai receber tbm

        }))
    }

    return (
        <BoardContext.Provider value={{ lists, move }}>
            <Container>
                {lists.map((list, index) => <List key={list.title} index={index} data={list} />)}

            </Container>
        </BoardContext.Provider>
        // o 'data' vai enviar todos os valores que tem dentro da devida 'key'
    );
    //BoardContext.Provider = Fornece valor para o meu contexto, 
    //Depois de adicionar o contexto, toda vez q a variavel list mudar, o contexto tbm vai mudar ou seja , todos os lugares que estão utilizando o contexto para criar algum tipo de informação vao ser atualizadas tbm
}