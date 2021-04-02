const formatVErrors = function (errors) {
    //the v error is responsible for sending only one validation error message for a particular field.
    //by default the joi validation validates each and every rules (eg: min,required,max etc) for a
    //field at once and send all the error message at once
    const { details } = errors;
    let unique = [];
    let message = [];
    details.forEach(element => {
        if (!(element.path in unique)) {
            unique[element.path] = 1;
            message.push(element);
        }
    });
    return message;
};


const getTimeFormats = () => {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = date_ob.getHours();
    // current minutes
    let minutes = date_ob.getMinutes();
    // current seconds
    let seconds = date_ob.getSeconds();
    return { year, month, date, hours, minutes, seconds };
}

export { formatVErrors, getTimeFormats };