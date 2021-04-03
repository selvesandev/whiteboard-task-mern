import { useState } from "react";
import { CategoryBox } from "./CategoryBox";

const CategoryCreator = () => {
    const [addNewCategory, setAddNewCategory] = useState(false);

    return addNewCategory ? <section className="category_iterator">
        <CategoryBox onSave={() => {
            setAddNewCategory(false);
        }} onBlur={() => {
            setAddNewCategory(false);
        }} mode={'add'} />
    </section > : <section style={{ marginRight: 40 }}
        onClick={() => {
            setAddNewCategory(true);
        }}
        className="action_add action_add_category"
    >
        <i className="fas fa-plus-circle"></i> &nbsp;Add New Category
      </section>;
}

export { CategoryCreator };