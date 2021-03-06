import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getCategories, reOrderCategory } from './store/actions';
import {
  CategoryBox,
  TaskCard,
  DownloadFlush,
  TaskModal,
  CategoryCreator,
} from "./components";


// TODO Scroll to the right most corner when new category added. on content overflow

/**
 * App Initialized
 * @returns 
 */
function App() {
  //state with hook
  //TODO Move this all the a custom hook
  const [selectedCategory, setselectedCategory] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const dispatch = useDispatch(); // to dispatch the redux action

  const categoryState = useSelector(state => state.category);//access the category redux state
  /**
   * Fetch categories
   */
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);//call the function only once when the app initialized for the first time.

  return (
    <div className="App">
      {/* React DnD Lirabry for drag and drop task around the category box */}
      <DragDropContext
        onDragEnd={(result) => {
          const { destination, source, draggableId } = result;
          if (!destination) {
            return;
          }
          if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
          ) {
            return;
          }
          //reorder the category statically and with api when dropped.
          dispatch(reOrderCategory({ destination: destination.droppableId, id: draggableId, source: source.droppableId, sourceIndex: source.index, destinationIndex: destination.index }));
        }}
      >
        {categoryState.data.map((category, catIn) => {
          //Category Box contains the list of task under a category
          return (
            <Droppable droppableId={String(category._id)} key={category._id}>
              {(provided, snapshot) => (
                <section className={"category_iterator " + (snapshot.isDraggingOver ? 'dragging_over' : '')} {...provided.droppableProps} ref={provided.innerRef}>
                  <CategoryBox
                    key={catIn}
                    category={category}
                  >
                    {category.tasks ? category.tasks.map((task, taIn) => {
                      //Task List inside the categories which can be moved aroud
                      return <Draggable index={taIn} draggableId={String(task._id)} key={task._id}>
                        {(provided, snapshot) =>
                          <div ref={provided.innerRef}
                            className={snapshot.isDragging ? 'is_dragging' : ''}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <TaskCard
                              onUpdate={() => {
                                setSelectedTask(task);
                                setselectedCategory(category);
                              }}
                              key={taIn} task={task} />
                          </div>
                        }
                      </Draggable>;
                    }) : null}
                    {/* Proceholder */}
                    {provided.placeholder}
                    {/* TODO Add New Task Button Move this to a new component*/}
                    <div
                      onClick={() => {
                        if (!category.static) {
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

      <CategoryCreator />

      <TaskModal selectedTask={selectedTask} show={selectedCategory !== null} category={selectedCategory} onClose={() => {
        setselectedCategory(null);
        setSelectedTask(null);
      }} />

      {categoryState.data.length > 0 ? <DownloadFlush /> : null}
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
