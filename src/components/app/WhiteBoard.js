import { Whiteboard, EventStream, EventStore } from '@ohtomi/react-whiteboard';


/**
 * Extended whiteboard component for the App. Handles and sends the svg data on onStop event.
 * @param {*} param0 
 * @returns 
 */
const AppWhiteBoard = ({ width, height = 150, goodEvents, onStop }) => {
    const eventStream = new EventStream();
    const eventStore = new EventStore();
    eventStore.goodEvents = [];

    if (goodEvents) {
        eventStore.goodEvents = goodEvents;
    }
    eventStream.on('stop', function () {
        if (onStop) onStop(eventStore.goodEvents);
    });

    return <div>
        <Whiteboard style={{ backgroundColor: 'white' }} height={height} width={width} events={eventStream} eventStore={eventStore} />
    </div>
}

export { AppWhiteBoard };