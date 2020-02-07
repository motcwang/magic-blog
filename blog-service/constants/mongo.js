const uri = process.env.NODE_ENV === 'dev' ? 'mongodb://localhost:27017/magic-blog' : 'mongodb://localhost:27017/magic-blog';
const options = {
    user: 'root',
    pass: 'Wc.1331588182',
    useNewUrlParser: true,
};

module.exports = {
    uri,
    options,
};
