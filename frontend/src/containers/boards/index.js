import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import BoardsList from 'components/boards';
import { Loader } from 'components/loader/index';

import ModalCreateBoard from 'containers/modal-create-board';

@inject('boardsStore')
@observer
class Boards extends Component {
  constructor(props) {
    super(props);

    this.props.boardsStore.getBoards(this.props.history);
  }

  render() {
    const { boardsStore } = this.props;

    return (
      <Fragment>
        {boardsStore.isLoading
          ? <Loader />
          : <BoardsList onClick={() => boardsStore.toggleShowModalCreateBoard()} boards={boardsStore.boards} />}

        {boardsStore.isShowCreateBoard
          ? <ModalCreateBoard />
          : null}
      </Fragment>
    );
  }
}

export default Boards;

Boards.propsType = {
  boardsStore: PropTypes.object
};
