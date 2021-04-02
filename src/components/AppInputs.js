import { Loader } from "./Loader";

/**
 * Input field component call this to render input[type=text]
 * @param {*} param0 
 * @returns 
 */
const TextInputField = ({ value, onBlur, placeholder, onChange, loading }) => {
    return <div className="input_container"><input type="text" className="input_element" placeholder={placeholder} autoFocus={true} onFocus={(e) => {
        e.target.select();
    }} value={value} onBlur={onBlur} onChange={(e) => {
        if (onChange)
            onChange(e.target.value);
    }} />
        {loading ? <Loader height={40} width={40} color="#4caf50" /> : null}
    </div>;
}

export { TextInputField };