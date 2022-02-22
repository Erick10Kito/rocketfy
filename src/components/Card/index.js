import React, { useRef, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Container, Label } from './styles';
import BoardContext from '../Board/context';

export default function Card({ data, index, listIndex }) {

    const ref = useRef();
    const { move } = useContext(BoardContext);


    const [{ isDragging }, dragRef] = useDrag({
        type: "CARD",
        item: { index, listIndex },
        //o tyoe nao deve estar dentro de item depois da atualização
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, dropRef] = useDrop({
        accept: 'CARD',
        hover(item, monitor) {


            const draggedListIndex = item.listIndex;

            //lista que ta tendo um item dela sendo arrastado

            const targetListIndex = listIndex;
            //Index da lista que esta recebendo um novo item


            const draggedIndex = item.index;
            //item que esta sendo carregado, no caso sendo segurado
            const targetIndex = index;
            //o alvo do que esta sendo arrastado, ou seja o que vai receber em cima o outro card


            if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
                return;
            }
            //esse if significa que se arrastar um card para o mesmo card ele não vai fazer nada


            const targetSize = ref.current.getBoundingClientRect();
            //(esse ref.current... é do proprio react ou é de alguma biblioteca que eu instalei? ele é usado para ver caracteristicas do elemento, como altura e largura por exemplo)
            const targetCenter = (targetSize.bottom - targetSize.top) / 2;
            // foi feito para calcular o pixel central

            const draggedOffset = monitor.getClientOffset();
            //esse aqui determina o quanto do item eu arrastei
            const draggedTop = draggedOffset.y - targetSize.top
            //draggedOffset.y = a distancia que eu estou arrastando esse elemento em relação ao topo da tela, ou seja quanto mais eu arrasto para baixo, maior vai ser a distamcia
            // targetSize.top = a distancia do item em relação ao topo da tela
            // ai oque sobra basicamente é o ponto e que o item entrou(dificil de entender)
            if (draggedIndex < targetIndex && draggedTop < targetCenter) {
                return;
            }
            /*o if acima significa que se o item que eu estou arrastando veio antes do item que esta recebendo  o arraste e a posição do draggedTop for menor que o centro do item eu não faço nada, evita a possibilidade 
            de quando o usuario arrastar um item pra antes de outo sendo que ele ja esta antes desse outro item , nao aconteça nada*/



            if (draggedIndex > targetIndex && draggedTop > targetCenter) {
                return;
            }
            //no if acima se um item que estiver depois de um elemento, tentar ser arrastado para depois desse mesmo elemento , nada vai acontecer , pois ele ja esta depois desse elemento


            move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);
            //nessa função eu declarei o valor de cada objeto que estava na sintaxe da função, que estava no componente 'Board'

            item.index = targetIndex;
            item.listIndex = targetListIndex;
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