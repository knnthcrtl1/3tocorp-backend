const middleware = require('../controllers/middleware/auth');

const studentRouter = require('./student.route');
const trainerRouter = require('./trainer.route');
const userRouter = require('./user.route');

module.exports = (app) => {

    app.use('/students', middleware.checkToken, studentRouter);
    app.use('/trainers', trainerRouter);
    app.use('/users', userRouter);

}