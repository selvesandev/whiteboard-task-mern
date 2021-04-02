import { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Whiteboard, EventStream, EventStore } from '@ohtomi/react-whiteboard';
import goodEvents from './config/events';

const categories = [
    {
        id: 1,
        name: 'Theory of Relativity',
        items: [
            {
                id: 1,
                name: 'Black Hole',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, explicabo!'
            },
            {
                id: 2,
                name: 'Fabrics of space',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, explicabo!'
            },
            {
                id: 3,
                name: 'Dark Matter',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, explicabo!'
            }
        ]
    },
    {
        id: 2,
        name: 'Quantum Physics',
        items: [
            {
                id: 4,
                name: 'Double Slit Experiment',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing'
            },

        ]
    }
];

const events = new EventStream();
const eventStore = new EventStore();
eventStore.goodEvents = goodEvents;
events.on('selectLayer', function () {
    console.log("selectLayer");
});
events.on('addLayer', function (value) {
    console.log("addLayer", value);
});

events.on('start', function (value) {
    console.log("start", value);
});

events.on('stop', function (value) {
    console.log("stop", value);
    console.log(eventStore.goodEvents)
});

events.on('startDragging', function (value) {
    console.log("startDragging", value);
});
events.on('stopDragging', function (value) {
    console.log("stopDragging", value);
});

events.on('drag', function (value) {
    console.log("drag", value);
});


events.on('startResizing', function (value) {
    console.log("startResizing", value);
});
events.on('stopResizing', function (value) {
    console.log("stopResizing", value);
});
events.on('resize', function (value) {
    console.log("stopDragging", value);
});

events.on('redo', function (value) {
    console.log("redo", value);
});

events.on('undo', function (value) {
    console.log("undo", value);
});
events.on('clear', function (value) {
    console.log("clear", value);
});




function App() {
    const [data, setData] = useState(categories);
    const [addNewFor, setAddNewFor] = useState(null);
    const [hoverCard, setHoverCard] = useState(null);
    const [editCard, setEditCard] = useState(null);
    const [editCategory, setEditCategory] = useState(null);
    // const inputEl = useRef(null);

    requestAnimationFrame(() => {
        console.log("here");
        events.changeStrokeColor('blue');
        // events.changeStrokeWidth(5)
        // events.startDrawing(100, 100)
        // events.pushPoint(100, 200)
        // events.pushPoint(200, 200)
        // events.pushPoint(200, 100)
        // events.pushPoint(110, 100)
        // events.stopDrawing()
        // events.undo()
        // events.undo()

    });



    // return <div><h1><Whiteboard
    //   events={events} eventStore={eventStore}
    //   width={800} height={600}
    //   style={{ backgroundColor: 'lightyellow' }}
    // /></h1></div>

    return (
        <div className="App">
            <DragDropContext onDragEnd={(result) => {
                const { destination, source, draggableId } = result;
            }}>
                {data.map((category, ind) => {
                    return <Droppable droppableId={String(category.id)} key={ind}>
                        {provided => (
                            <section {...provided.droppableProps} ref={provided.innerRef} className="category_iterator">
                                {category.id !== editCategory ? <h2 className="cat_title" onClick={() => {
                                    setEditCategory(category.id);
                                }}><span>{category.name}</span></h2> : <form onSubmit={(e) => { e.preventDefault(); setEditCategory(null) }}><input type="text" onBlur={() => {
                                    setEditCategory(null);
                                }} className="input_element" autoFocus={true} onFocus={(e) => {
                                    e.target.select();
                                }} value={category.name} onChange={() => {

                                }} /></form>}
                                {
                                    category.items.map((note, i) => {
                                        return <Draggable index={i} draggableId={String(note.id)} key={i + ind}>
                                            {provided => editCard !== note.id ? <div
                                                onMouseOver={() => {
                                                    setHoverCard(note.id);
                                                }}
                                                onMouseLeave={() => {
                                                    setHoverCard(null);
                                                }}

                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef} className={'notes n_card ' + (hoverCard === note.id ? 'hovered' : '')}>
                                                <p>{note.desc}</p>
                                                {hoverCard === note.id ? <div className={'note_alter_action'}>
                                                    <a onClick={() => {
                                                        setEditCard(note.id);
                                                    }}><i className="fas fa-pen"></i></a>
                                                    <a onClick={() => {

                                                    }}><i className="fas fa-trash"></i></a>

                                                </div> : null}
                                            </div> : <form ref={provided.innerRef} {...provided.draggableProps}
                                                {...provided.dragHandleProps} onSubmit={(e) => {
                                                    e.preventDefault();
                                                }}>
                                                <textarea placeholder="What's are you up to?" rows={4} onChange={() => {

                                                }} className="form_input" value={note.desc}></textarea>
                                                <div className="task_act_button">
                                                    <button className="btn btn-primary" type="submit" onClick={() => {

                                                    }}>Create Task</button>
                  &nbsp;&nbsp;
                  <button type="button" className="btn" onClick={() => {
                                                        setAddNewFor(null);
                                                        setEditCard(null);
                                                    }}>Cancel</button>
                                                </div>
                                            </form>}
                                        </Draggable>
                                    })
                                }
                                {provided.placeholder}

                                {addNewFor !== category.id ? <div onClick={() => {
                                    setAddNewFor(category.id);
                                }} className={'action_add action_add_item'}>
                                    <i className="fas fa-plus-circle"></i> &nbsp;Add New Task..
              </div> : <form onSubmit={(e) => {
                                    e.preventDefault();
                                }}>
                                    <textarea placeholder="What's are you up to?" rows={4} className="form_input"></textarea>
                                    <div className="task_act_button">
                                        <button className="btn btn-primary" type="submit" onClick={() => {

                                        }}>Create Task</button>
                  &nbsp;&nbsp;
                  <button type="button" className="btn" onClick={() => {
                                            setAddNewFor(null);
                                        }}>Cancel</button>
                                    </div>
                                </form>}
                            </section>)}
                    </Droppable>
                })}
            </DragDropContext>

            <section className="action_add action_add_category">
                <i className="fas fa-plus-circle"></i> &nbsp;Add New Category
      </section>

        </div>
    );
}




export default App;
