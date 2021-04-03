import { flushRecord } from "../../store/actions";
import { useDispatch } from 'react-redux';

const DownloadFlush = () => {
    const dispatch = useDispatch(); // to dispatch the redux action

    return <div className={'downloder'}>
        <button onClick={() => {
            window.location.href = process.env.REACT_APP_API_PATH + '/category/download';
        }}>Download</button>
        <button onClick={() => {
            dispatch(flushRecord());
        }}>Flush Records</button>
    </div>
}
export { DownloadFlush }