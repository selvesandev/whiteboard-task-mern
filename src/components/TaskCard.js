import { AppWhiteBoard } from "./WhiteBoard"
import { useDispatch } from 'react-redux';
import { deleteTask, getCategories, updateTask } from "../store/actions";
import { useState } from 'react';
import { Whiteboard, EventStream, EventStore } from '@ohtomi/react-whiteboard';

const eventStream = new EventStream();
const eventStore = new EventStore();


/**
 * Display the fetched task svg and performs action delete/update/duplicate
 * @param {*} param0 
 * @returns 
 */
const TaskCard = ({ task, onUpdate, onDelete, onDuplicate }) => {
    const dispatch = useDispatch();
    const [duplicate, setDuplicate] = useState(false);
    eventStore.goodEvents = task.svg_events;
    return <div
        className={'notes n_card '} style={{}}>

        <Whiteboard style={{ backgroundColor: 'white' }} height={150} events={eventStream} eventStore={eventStore} />

        <div className="card_action">
            <a href="/" disabled={duplicate} className={(duplicate ? 'disabled' : '')} onClick={(e) => {
                e.preventDefault();
                setDuplicate(true);
                dispatch(updateTask({ id: task._id, svg_events: task.svg_events, mode: 'DUPLICATE' })).then((res) => {
                    dispatch(getCategories());
                }).catch(err => {
                    console.log(err);
                }).finally(() => {
                    setDuplicate(false);
                });
            }}>
                <i className={"far fa-copy " + (duplicate ? 'rotate_' : '')}></i>
            </a>

            <a href="/" onClick={(e) => {
                e.preventDefault();
                if (onUpdate) onUpdate();
            }} >
                <i className="far fa-pen"></i>
            </a>
            <a href="/" onClick={(e) => {
                e.preventDefault();
                dispatch(deleteTask({ id: task._id })).catch(() => {
                })
            }}>
                <i className={"far fa-trash "}></i>
            </a>
        </div>


        <div className="overlay"></div>

    </div>
}

export { TaskCard };