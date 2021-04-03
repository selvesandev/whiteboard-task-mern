import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getCategories, updateTask } from "../../store/actions";
import { useState } from 'react';
import { Whiteboard, EventStream, EventStore } from '@ohtomi/react-whiteboard';

const eventStream = new EventStream();
const eventStore = new EventStore();


/**
 * Display the fetched task svg and performs action delete/update/duplicate
 * @param {*} param0 
 * @returns 
 */
const TaskCard = ({ task, onUpdate }) => {
    const dispatch = useDispatch();
    const [duplicate, setDuplicate] = useState(false);
    const taskState = useSelector(state => state.task)
    eventStore.goodEvents = task.svg_events;

    return <div className={'notes n_card '}>
        {/* Whiteboard to render the svg */}
        <Whiteboard style={{ backgroundColor: 'white' }} height={150} events={eventStream} eventStore={eventStore} />

        <div className="card_action">
            <a href="/" disabled={duplicate} className={(duplicate ? 'disabled' : '')} onClick={(e) => {
                e.preventDefault();
                if (task.static) return;
                setDuplicate(true);
                //Here also passing the category because when clicking the duplicate button before the task is actually moved to the another category in the backend the duplicate is created on the previous category hence also updating the category of the card.
                dispatch(updateTask({ id: task._id, svg_events: task.svg_events, mode: 'DUPLICATE', category: task.category })).then((res) => {
                    dispatch(getCategories()).finally(() => {
                        setDuplicate(false);
                    });
                }).finally(() => {
                });
            }}>
                <i className={"far fa-copy " + (duplicate ? 'rotate_' : '')}></i>
            </a>

            <a href="/" onClick={(e) => {
                e.preventDefault();
                if (task.static || taskState.ordering) return;

                if (onUpdate) onUpdate();
            }} >
                <i className="far fa-pen"></i>
            </a>
            <a href="/" onClick={(e) => {
                e.preventDefault();
                if (task.static) return;
                dispatch(deleteTask({ id: task._id }));
            }}>
                <i className={"far fa-trash "}></i>
            </a>
        </div>
        <div className="overlay"></div>
    </div>
}

export { TaskCard };