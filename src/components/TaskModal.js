import { useDispatch, useSelector } from 'react-redux';
import { createTask, getCategories, updateTask } from '../store/actions';
import { Modal } from "./Modal";
import { AppWhiteBoard } from "./WhiteBoard";

let svgEvents = [];
/**
 * The TaskModal Components is responsible to update and create the task on the whiteboard.
 * @param {*} param0 
 * @returns 
 */
const TaskModal = ({ onClose, height = 440, category, show, mode = 'CREATE', selectedTask }) => {
    const dispatch = useDispatch();
    const task = useSelector(state => state.task);
    let title = `Add New Task "${category ? category.name : ""}"`;
    let goodEvents = null;
    if (selectedTask) {
        title = mode === 'CREATE' ? `Update Task "${category ? category.name : ""}"` : `Duplicate Task "${category ? category.name : ""}"`;
        goodEvents = selectedTask.svg_events;
        svgEvents = selectedTask.svg_events;
    }

    return <Modal
        btnText={!selectedTask ? 'Create Task' : (mode === 'CREATE' ? 'Update Task' : 'Duplicate Task')}
        loading={task.saving}
        onSave={() => {
            if (svgEvents && svgEvents.length) {
                if (selectedTask) {
                    dispatch(updateTask({ svg_events: svgEvents, id: selectedTask._id, mode })).then(res => {
                        // dispatch(getCategories());
                        onClose();
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    dispatch(createTask({ svg_events: svgEvents, category: category._id })).then(res => {
                        // dispatch(getCategories());
                        svgEvents = [];
                        onClose();
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }
        }}
        height={height}
        subTitle={"Draw on the white board to and create a new task."}
        title={title}
        onClose={() => {
            if (onClose) onClose();
        }}
        show={show}
    >
        <AppWhiteBoard goodEvents={goodEvents} onStop={(goodEvents) => {
            svgEvents = goodEvents;
        }} height={220} width={500} />
        <p style={{ color: "#999" }}>
            <small>Click and move your mouse to start drawing</small>
        </p>
    </Modal>
}

export { TaskModal };