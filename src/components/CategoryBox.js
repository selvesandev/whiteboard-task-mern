import { useState, useEffect } from 'react';
import { TextInputField } from './AppInputs';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, getCategories, updateCategory } from '../store/actions';


/**
 * Add / Update Category also placeholder for the task list.
 * @param {*} param0 
 * @returns 
 */
const CategoryBox = ({ category, selectCategory, children, mode = 'edit', onBlur, onSave }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const dispatch = useDispatch();

    const categoryState = useSelector(state => state.category);

    useEffect(() => {
        if (category) {
            setCategoryName(category.name);
        }
    }, [])

    return <section>
        {mode !== 'add' && selectedCategory !== category.id ? <h2 className="cat_title" onClick={() => {
            setSelectedCategory(category.id);
            if (selectCategory) {
                selectCategory(category);
            }
        }}><span>{category.name}</span></h2> :
            <form onSubmit={(e) => {
                e.preventDefault();
                //if category was send update or create
                if (!category) {
                    dispatch(createCategory({ name: categoryName })).then(res => {
                        dispatch(getCategories());
                        if (onSave) onSave();
                    }).catch(err => {
                    });
                } else {
                    dispatch(updateCategory({ id: category._id, name: categoryName })).then(res => {
                        setSelectedCategory(null);
                        dispatch(getCategories());
                        if (onSave) onSave();
                    }).catch(err => {

                    });
                }
            }}>
                <TextInputField loading={categoryState.saving} onChange={(text) => {
                    setCategoryName(text);
                }} placeholder={'Name your category'} onBlur={() => {
                    setSelectedCategory(null);
                    //handle the cateogry input focus out from outside the component
                    if (onBlur)
                        onBlur();
                }} value={categoryName} />
            </form>}

        {children}
    </section>
}

CategoryBox.proTotype = {
    // categoryName: PropTypes.string.isRequired
};

export { CategoryBox };