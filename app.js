const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// routes
const studentRouter = require('./routes/student.route');
const trainerRouter = require('./routes/trainer.route');
const userRouter = require('./routes/user.route');

const app = express();


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


mongoose.connect('mongodb+srv://user_mongodb:user_mongodb@clustercrud-vhqxe.mongodb.net/crud?retryWrites=true&w=majority', {
	useNewUrlParser: true
});


app.use('/students', studentRouter);
app.use('/trainers', trainerRouter);
app.use('/users', userRouter);


app.listen(process.env.PORT || 3000 , () => { console.log(`Server is running n port ${process.env.PORT}`) });
