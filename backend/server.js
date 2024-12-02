

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const Company = require('./models/companyModel');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const cors = require('cors');

const uploadDirectory = 'uploads/images';

if (!fs.existsSync(uploadDirectory)){
    fs.mkdirSync(uploadDirectory, { recursive: true });
}


// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images');  // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid name collisions
    }
});


// Initialize multer with the storage configuration
const upload = multer({ 
    storage: storage, 
    limits: { fileSize: 10 * 1024 * 1024 } // Set 10MB limit, adjust as needed
});

const app = express();

app.use(express.json());

// Enable sessions
app.use(session({
    secret: 'your-secret-key',  // Replace with a strong secret in production
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
        httpOnly: true,  // Prevent client-side access to cookies
        maxAge: 1000 * 60 * 60 * 24 // 1 day session lifespan
    }
}));


app.use(cors({
    origin: 'http://localhost:3000',  // Replace with your frontend URL
    credentials: true  // Allow credentials (for cookies and sessions)
}));

const isAuthenticated = (req, res, next) => {
    //ikde baddle 
    if (req.session && req.session.user) {
        return next();  // User is authenticated, proceed to the next middleware/route handler
    }
    res.status(401).json({ message: 'Unauthorized access' });  // Return unauthorized error if no session
};
//hmmmmmmmmmmmmmmmmmmmmmm


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ email: username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }

        // Create session
        req.session.user = user;
        res.json({ success: true, userType: user.type,  // Include userType in the response
             });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});



app.get('/check-session', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});





// API for image uploading
app.post('/user/uploadImage/:id', upload.single('file'), async (req, res) => {
    try {
        console.log(req.file); // Log the file object for debugging
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        
        // Get the file path (relative URL for serving images)
        const imagePath = `/images/${req.file.filename}`;

        // Optionally: Save the image path to the user's document in the database
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Save image path (or filename) to the user profile
        user.profileImage = imagePath;  // Assuming 'profileImage' field exists in the user model
        await user.save();

        res.status(200).json({
            message: 'Image uploaded successfully!',
            imagePath: imagePath
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
// Creating user
app.post('/user/create', upload.single('file'), async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
// Retrieving all users
app.get('/user/getAll', async (req, res) => {
    try {
        // Use .select('-password') to exclude the password field
        const users = await User.find({}).select('fullname email type');
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Update the user
app.put('/user/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { fullname, password } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: `Cannot find user with id: ${id}` });
        }

        // Update only fullname and password fields
        if (fullname) {
            if (fullname.length < 3) {
                return res.status(400).json({ message: "Full Name must be at least 3 characters long" });
            }
            user.fullname = fullname;
        }

        if (password) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({
                    message: "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, and one number"
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
// Delete a user
app.delete('/user/delete/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOneAndDelete({ email });
        if (!user) {
            return res.status(404).json({ message: `User with email ${email} not found` });
        }
        res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});







//Company
app.post('/company/create', upload.single('profileImage'), async (req, res) => {
    try {
        console.log(req.file); // Debug uploaded file
        const { companyname, jobrole, description, applylink, salary } = req.body;

        const newCompany = new Company({
            companyname,
            jobrole,
            description,
            applylink,
            salary,
            profileImage: req.file ? `/images/${req.file.filename}` : null, // Optional image
        });

        await newCompany.save();
        res.status(200).json(newCompany);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});


app.use('/images', express.static(path.join(__dirname, 'uploads/images')));
 

// Retrieving all companies
app.get('/company/getAll', async (req, res) => {
    try {
        const companies = await Company.find({});
        res.status(200).json(companies);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

  
// Update a company
app.put('/company/update/:id', async (req, res) => {
    const companyId = req.params.id;
    const updatedData = req.body;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
        return res.status(400).json({ message: 'Invalid company ID format' });
    }

    try {
        // Log the request body for debugging
        console.log('Updating company with data:', updatedData);

        // Find company by ID and update with new data
        const updatedCompany = await Company.findByIdAndUpdate(companyId, updatedData, {
            new: true,  // Return the updated document
            runValidators: true,  // Apply schema validations on update
        });

        if (!updatedCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Successfully updated company
        res.status(200).json({
            message: 'Company updated successfully',
            data: updatedCompany,
        });
    } catch (error) {
        console.error('Error updating company:', error);  // Better error logging
        res.status(500).json({ message: 'Error updating company', error: error.message });
    }
});


// Delete a company
app.delete('/company/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const company = await Company.findByIdAndDelete(id);  // Correct method to find and delete by ID
        if (!company) {
            return res.status(404).json({ message: `Company with id ${id} not found` });
        }
        res.status(200).json({ message: "Company deleted successfully", company });
    } catch (error) {
        console.error(error);  // Better for error logging
        res.status(500).json({ message: error.message });
    }
});


mongoose.connect('mongodb+srv://hublisushmita7:Sushmita12@cluster0.ot0dj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        app.listen(4119, () => {
            console.log("Connected with MongoDB");
            console.log("Node App running on Port 4119");
        });
    })
    .catch((error) => {
        console.log(error);
    });

   


