import React from "react";
import { useDrag } from "react-dnd";
import { Container, Label } from './styles';

export default function Card({ data }) {
    const [{ isDragging }, dragRef] = useDrag({
        item: { type: 'CARD' },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
        //collect coleta uma infrmação se o usuario esta arrastando o item ou não e qual item é esse
        //o monitor é um parametro que tem todas as variaveis sobre o estado do item no momento
    });

    return (
        <Container ref={dragRef}>
            <header>
                {data.labels.map(label => <Label key={label} color={label} />)}

            </header>
            <p>{data.content}</p>
            <img src={data.user} alt="" />
        </Container>

    );
}