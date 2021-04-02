import { Whiteboard, EventStream, EventStore } from '@ohtomi/react-whiteboard';


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