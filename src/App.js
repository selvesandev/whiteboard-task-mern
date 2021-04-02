import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getCategories, reOrderCategory, flushRecord } from './store/actions';
import {
  CategoryBox,
  TaskCard,
  TaskModal,
} from "./components";
import { Loader } from "./components/Loader";


// TODO Scroll to the right most corner when new category added. on content overflow


function App() {
  const [selectedCategory, setselectedCategory] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [mode, setMode] = useState('CREATE');

  const [addNewCategory, setAddNewCategory] = useState(false);
  const dispatch = useDispatch();
  const categoryState = useSelector(state => state.category)
  useEffect(() => {
    dispatch(getCategories()).catch(err => {
    });
  }, []);
  return (
    <div className="App">
      <DragDropContext
        onDragEnd={(result) => {
          const { destination, source, draggableId } = result;
          dispatch(reOrderCategory({ destination: destination.droppableId, id: draggableId, source: source.droppableId }));
        }}
      >
        {categoryState.data.map((category, catIn) => {
          return (
            <Droppable droppableId={String(category._id)} key={catIn}>
              {provided => (
                <section className="category_iterator" {...provided.droppableProps} ref={provided.innerRef}>
                  <CategoryBox
                    selectCategory={(category) => { }}
                    key={catIn}
                    category={category}
                  >
                    {category.tasks ? category.tasks.map((task, taIn) => {
                      return <Draggable index={taIn} draggableId={String(task._id)} key={taIn + catIn}>
                        {provided =>
                          <div ref={provided.innerRef} {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <TaskCard onUpdate={() => {
                              setSelectedTask(task);
                              setselectedCategory(category);
                            }} onDuplicate={() => {
                              setSelectedTask(task);
                              setselectedCategory(category);
                              setMode('DUPLICATE');
                            }} key={taIn} task={task} />
                          </div>
                        }
                      </Draggable>;
                    }) : null}
                    {provided.placeholder}

                    <div
                      onClick={() => {
                        if (!category.static && !categoryState.fetching) {
                          setSelectedTask(null);
                          setselectedCategory(category);
                        }
                      }}
                      className={"action_add action_add_item"}
                    >
                      <i className="fas fa-plus-circle"></i> &nbsp;Add New Task..
                  </div>
                  </CategoryBox>
                </section>
              )}
            </Droppable>
          );
        })}
      </DragDropContext>

      {addNewCategory ? <section className="category_iterator">
        <CategoryBox onSave={() => {
          setAddNewCategory(false);
        }} onBlur={() => {
          setAddNewCategory(false);
        }} mode={'add'} />
      </section> : <section style={{ marginRight: 40 }}
        onClick={() => {
          setAddNewCategory(true);
        }}
        className="action_add action_add_category"
      >
        <i className="fas fa-plus-circle"></i> &nbsp;Add New Category
      </section>}

      <TaskModal mode={mode} selectedTask={selectedTask} show={selectedCategory !== null} category={selectedCategory} onClose={() => {
        setselectedCategory(null);
        setSelectedTask(null);
      }} />

      {categoryState.data.length > 0 ? <div className={'downloder'}>
        <button onClick={() => {
          window.location.href = process.env.REACT_APP_API_PATH + '/category/download';
        }}>Download</button>

        <button onClick={() => {
          dispatch(flushRecord()).catch(err => {
            console.log(err);
          });
        }}>Flush Records</button>
      </div> : null}
    </div >
  );
}

export default App;



// requestAnimationFrame(() => {
  // events.changeStrokeColor("blue");
  // events.changeStrokeWidth(5)
  // events.startDrawing(100, 100)
  // events.pushPoint(100, 200)
  // events.pushPoint(200, 200)
  // events.pushPoint(200, 100)
  // events.pushPoint(110, 100)
  // events.stopDrawing()
  // events.undo()
  // events.undo()
// });

// const events = new EventStream();
// const eventStore = new EventStore();
// eventStore.goodEvents = goodEvents;
// events.on("selectLayer", function () {
//   console.log("selectLayer");
// });
// events.on("addLayer", function (value) {
//   console.log("addLayer", value);
// });

// events.on("start", function (value) {
//   console.log("start", value);
// });

// events.on("stop", function (value) {
//   console.log("stop", value);

//   console.log(eventStore.goodEvents);
// });

// events.on("startDragging", function (value) {
//   console.log("startDragging", value);
// });
// events.on("stopDragging", function (value) {
//   console.log("stopDragging", value);
// });

// events.on("drag", function (value) {
//   console.log("drag", value);
// });

// events.on("startResizing", function (value) {
//   console.log("startResizing", value);
// });
// events.on("stopResizing", function (value) {
//   console.log("stopResizing", value);
// });
// events.on("resize", function (value) {
//   console.log("stopDragging", value);
// });

// events.on("redo", function (value) {
//   console.log("redo", value);
// });

// events.on("undo", function (value) {
//   console.log("undo", value);
// });
// events.on("clear", function (value) {
//   console.log("clear", value);
// });
// hkl_user 
// DlA1fsCnWsp1PjIz
