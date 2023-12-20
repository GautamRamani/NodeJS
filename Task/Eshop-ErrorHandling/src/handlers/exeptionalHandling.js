function handler(api) {
    if (typeof api !== 'function') throw new Error('handler must be a function')
    return async function (...arg) {
        try {
            let result = await api(...arg)
            return result;
        } catch (error) {
            console.log(`Error in ${api.name}`);
            console.log(error);
            let res = [...arg][1]
            if (res) res.send(`somehting went wrong ${api.name}`)
        }
    }
}

module.exports = { handler }