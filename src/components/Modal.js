
const Modal = ({ children, onClose, show = false, width = 500, height = 500, title, subTitle, onSave, loading = false, btnText = 'Create Task' }) => {

    if (show)
        return <div>
            <div className="modal" style={{ width, height }}>
                <div className={'title'}>
                    {title ? <h1 className={''}>{title}</h1> : null}
                    {subTitle ? <small>{subTitle}</small> : null}
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-action">
                    <div className="task_act_button">
                        <button disabled={loading} className={`btn btn-primary ${loading ? 'disabled' : ''}`} type="submit" onClick={() => {
                            if (onSave) onSave();
                        }}>{loading ? 'Saving...' : btnText}</button>
                  &nbsp;&nbsp;
                  <button type="button" className="btn" onClick={() => {
                            if (onClose) {
                                onClose();
                            }
                        }}>Cancel</button>
                    </div>

                </div>
            </div>
            <div className="bg" onClick={e => {
                e.preventDefault();
                if (onClose) {
                    onClose();
                }
            }} />
        </div>
    return null;
}

export { Modal };