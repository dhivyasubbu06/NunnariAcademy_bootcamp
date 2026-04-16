const express = require('express'); //server framework 
const mongoose = require('mongoose'); // DB Connection 
const cors = require('cors'); // allow frontend access 

const app = express();  // app holds all api  process 

//midleware 
app.use(express.json()); 
app.use(cors()); 

// MongoDB Atlas Connection 
mongoose.connect('mongodb+srv://Dhivya:Dhivya2004@cluster0.0kwvns7.mongodb.net/?appName=Cluster0')
.then(() => console.log('Connected to MongoDB Atlas')) // ensure connection 
.catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

// Schema 
// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String
// });


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
});

// Model (collection) 
const User = mongoose.model('User', userSchema); 

// CREATE (POST) 
app.post('/add-user', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send('User added successfully');
}); 

// READ (GET) 
app.get('/users', async (req, res) => {
    const users = await User.find({isDeleted:false}); 
    res.json(users); 
    res.send('User fetched successfully');
}); 

// UPDATE (PUT) 
app.put('/update/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.send('User updated successfully');
}); 

//DELETE (DELETE) 
// app.delete('/delete/:id', async (req, res) => {
//     await User.findByIdAndDelete(req.params.id);
//     res.send('User deleted successfully');
// }); 

app.delete('/delete/:id', async (req, res) => {
    await User.findByIdAndUpdate(
        req.params.id,
        { isDeleted: true },
        { new: true }
    );
    res.send('User soft deleted successfully');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 
