import * as React from 'react'
import { findDOMNode } from 'react-dom'
import {
  DragSource,
  DropTarget,
  DragSourceConnector,
  DragSourceMonitor,
  DropTargetMonitor,
  DropTargetConnector,
} from 'react-dnd'

const ItemTypes = {
  CARD: 'card',
}

const cardSource = {
  beginDrag(props: Props) {
    return {
      id: props.id,
      index: props.index,
    }
  },
}

const cardTarget = {
  hover(props: Props, monitor: any, component: any) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  },
}

interface Props2 {
  index?: number,
  id: number,
  text: string,
  moveCard: (dragIndex: number, hoverIndex: number) => void,
}

interface Props {
  connectDragSource: Function,
  connectDropTarget: Function,
  index: number,
  isDragging: boolean,
  id: number,
  text: string,
  moveCard: (dragIndex: number, hoverIndex: number) => void,
}

class Card extends React.Component<Props, {}> {
  render() {
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props
    const opacity = isDragging ? 0 : 1

    return connectDragSource(connectDropTarget(
      <div style={{
        border: '1px dashed gray',
        padding: '0.5rem 1rem',
        marginBottom: '.5rem',
        backgroundColor: 'white',
        cursor: 'move',
        opacity
      }}>
        {text}
      </div>,
    ))
  }
}

const CardWrapped = DropTarget(ItemTypes.CARD, cardTarget, (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
  connectDropTarget: connect.dropTarget(),
}))(Card)

export default DragSource<Props2>(ItemTypes.CARD, cardSource, (connect : DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(CardWrapped)