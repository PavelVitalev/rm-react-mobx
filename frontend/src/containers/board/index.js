import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

import './styles.scss';

import BoardHeader from 'containers/board-header';
import Column from 'containers/column';
import CreateColumn from 'containers/create-column';
import { Loader } from 'components/loader';


import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const reorder = (tasks, startIndex, endIndex) => {
  const result = Array.from(tasks);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (sourceTasks, destinationTasks, droppableSource, droppableDestination) => {
  // debugger
  const sourceClone = Array.from(sourceTasks);
  const destClone = Array.from(destinationTasks);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

@inject('boardStore')
@observer
class Board extends Component {
  constructor(props) {
    super(props);

    const { match: { params: { id } } } = props;

    props.boardStore.getBoard(id);
  }

  render() {
    const { history, boardStore, boardStore: { board } } = this.props;

    return (
      boardStore.isLoading && !board
        ? <Loader />
        : (
          <div className="board-wrap">
            <BoardHeader users={board.users} title={board.title} id={board._id} history={history} />

            <div className="columns-wrap">

              <DragDropContext onDragEnd={boardStore.onDragEnd()}>
                {board.columns.map((column, i) => {
                  return (
                    <Droppable key={column._id} droppableId={column._id}>
                      {(provided) => {
                        return (
                          <div ref={provided.innerRef}>
                            <Column column={column} />
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  );
                })}
              </DragDropContext>

              <CreateColumn isLoading={boardStore.isLoading} boardId={board._id} />
            </div>
          </div>
        )
    );
  }
}

export default Board;

Board.propTypes = {
  history: PropTypes.object,
  boardStore: PropTypes.object
};
