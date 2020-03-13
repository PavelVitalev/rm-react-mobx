import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

import Task from 'containers/task';

const Tasks = ({ column }) => {
  return (
    <div className="tasks">
      {
        column.tasks.map((task, index) => {

          return (
            <Task key={task._id} columnId={column._id} task={task} index={index} />
          );
        })
      }
    </div>
  );
};

export default Tasks;

Tasks.propTypes = {
  column: PropTypes.object
};
