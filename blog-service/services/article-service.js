const Article = require('../storage/models/article');
const connectDb = require('../storage/connect').connectDb;

const articleService = {

    /**
     * 创建文章
     */
    async create(data) {
        await connectDb();
        const result = await Article.create(data);

        return result;
    },

    /**
     * 删除文章
     */
    async deleteArticle() {
        // todo
    },

    /**
     * 更新文章
     */
    async update() {
        // todo
    },

    async page() {
        const result = await connectDb();

        return Article.find().exec();
    },

};

module.exports = articleService;
