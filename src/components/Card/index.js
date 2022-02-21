import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Container, Label } from './styles';

export default function Card({ data, index }) {

    const ref = useRef();


    const [{ isDragging }, dragRef] = useDrag({
        type: "CARD",
        item: { index, id: data.id, content: data.content },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, dropRef] = useDrop({
        accept: 'CARD',
        hover(item, monitor) {
            console.log(item.id, index);

        }
    })




    dragRef(dropRef(ref));

    return (
        <Container ref={ref} isDragging={isDragging}>
            <header>
                {data.labels.map(label => <Label key={label} color={label} />)}

            </header>
            <p>{data.content}</p>
            <img src={data.user} alt="" />
        </Container>

    );
}