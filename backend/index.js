// const express = require('express'); //server framework 
// const mongoose = require('mongoose'); // DB Connection 
// const cors = require('cors'); // allow frontend access 

// const app = express();  // app holds all api  process 

// //midleware 
// app.use(express.json()); 
// app.use(cors()); 

// // MongoDB Atlas Connection 
// mongoose.connect('mongodb+srv://Dhivya:Dhivya2004@cluster0.0kwvns7.mongodb.net/?appName=Cluster0')
// .then(() => console.log('Connected to MongoDB Atlas')) // ensure connection 
// .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

// // Schema 
// // const userSchema = new mongoose.Schema({
// //     name: String,
// //     email: String
// // });


// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     isDeleted: {
//         type: Boolean,
//         default: false
//     }
// });

// // Model (collection) 
// const User = mongoose.model('User', userSchema); 

// // CREATE (POST) 
// app.post('/add-user', async (req, res) => {
//     const user = new User(req.body);
//     await user.save();
//     res.send('User added successfully');
// }); 

// // READ (GET) 
// app.get('/users', async (req, res) => {
//     const users = await User.find({isDeleted:false}); 
//     res.json(users); 
//     res.send('User fetched successfully');
// }); 

// // UPDATE (PUT) 
// app.put('/update/:id', async (req, res) => {
//     await User.findByIdAndUpdate(req.params.id, req.body);
//     res.send('User updated successfully');
// }); 

// //DELETE (DELETE) 
// // app.delete('/delete/:id', async (req, res) => {
// //     await User.findByIdAndDelete(req.params.id);
// //     res.send('User deleted successfully');
// // }); 

// app.delete('/delete/:id', async (req, res) => {
//     await User.findByIdAndUpdate(
//         req.params.id,
//         { isDeleted: true },
//         { new: true }
//     );
//     res.send('User soft deleted successfully');
// });


// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// }); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cors());

const SECRET = "mysecretkey";

// MongoDB Connection
mongoose.connect('mongodb+srv://Keerthana:%40Nunnari0712@cluster0.5xohaph.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    isDeleted: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

// CREATE
app.post('/add-user', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send("User added");
    } catch (err) {
        res.status(500).send(err);
    }
});

// READ
app.get('/users', async (req, res) => {
    const users = await User.find({ isDeleted: false });
    res.json(users);
});

// UPDATE
app.put('/update/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.send("Updated");
});

// SOFT DELETE
app.put('/delete/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.send("Soft Deleted");
});

// LOGIN (JWT)
app.post('/login', (req, res) => {
    const { email } = req.body;

    if (!email) return res.send("Email required");

    const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });

    res.json({ token });
});

// VERIFY TOKEN
function verifyToken(req, res, next) {
    const bearer = req.headers['authorization'];

    if (!bearer) return res.sendStatus(403);

    const token = bearer.split(" ")[1];

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.user = decoded;
        next();
    });
}

// PROTECTED ROUTE
app.get('/profile', verifyToken, (req, res) => {
    res.json({
        message: "Protected data",
        user: req.user
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));