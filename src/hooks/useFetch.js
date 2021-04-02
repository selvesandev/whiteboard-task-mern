import { getCategories } from "../store/actions";
import { useDispatch, useSelector } from 'react-redux';

const useFetch = () => {
    const [selectedCategory, setselectedCategory] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [mode, setMode] = useState('CREATE');
    const [addNewCategory, setAddNewCategory] = useState(false);
    const dispatch = useDispatch();
    const category = useSelector(state => state.category)

    dispatch(getCategories()).catch(err => {
    });
}

export default useFetch;