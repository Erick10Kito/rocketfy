import React from "react";
import { Container } from './styles';
import List from '../List';
import { loadLists } from '../../services/api'

const lists = loadLists();

export default function Board() {

    return (
        <Container>
            {lists.map(list => <List key={list.title} data={list} />)}

        </Container>
        // o 'data' vai enviar todos os valores que tem dentro da devida 'key'
    );
}