const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');


const app = express();
app.use(cors({ origin: true }));
app.use(express.json()); 

// Initialize Firebase Admin
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://task-management-9ecac-default-rtdb.firebaseio.com"
});



const db = admin.firestore();

// Firebase Authentication instance
const auth = admin.auth();


app.get('/api/users', async (req, res) => {
  try {
    const userRecords = await admin.auth().listUsers();

    const users = userRecords.users.map((user) => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      
    }));

    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error');
  }
});


// Routes start
app.get('/', (req, res) => {
  return res.status(200).send("Hello World");
});

// Create task endpoint
app.post('/api/createTask/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const taskRef = await db.collection('tasks').doc(`${Date.now()}`);

    await taskRef.set({
      id: Date.now(),
      userId: userId,
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      completed: false,
    });

    return res.status(200).send('Task created');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error');
  }
});


// Get Tasks Endpoint
app.get('/api/tasks/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const snapshot = await db.collection('tasks').where('userId', '==', userId).get();

    const tasks = [];
    snapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });

    return res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error');
  }
});

// Update Task Endpoint
app.put('/api/updateTask/:userId/:id', async (req, res) => {
  try {
    const userId = req.params.userId;
    const taskId = req.params.id;
    const taskRef = db.collection('tasks').doc(taskId);
    const taskDoc = await taskRef.get();
    if (!taskDoc.exists || taskDoc.data().userId !== userId) {
      return res.status(404).send('Task not found or does not belong to the user');
    }
    const updateData = {
      title: req.body.title || taskDoc.data().title,
      description: req.body.description || taskDoc.data().description,
      dueDate: req.body.dueDate || taskDoc.data().dueDate,
      completed: req.body.hasOwnProperty('completed') ? req.body.completed : taskDoc.data().completed,
    };

    await taskRef.set(updateData, { merge: true });

    return res.status(200).send('Task updated');
  } catch (err) {
    console.error('Error updating task:', err);
    return res.status(500).send('Error updating task');
  }
});

// Delete task Endpoint
app.delete('/api/deleteTask/:userId/:id', async (req, res) => {
  try {
    const userId = req.params.userId;
    const taskId = req.params.id;
    const taskRef = db.collection('tasks').doc(taskId);
    const taskDoc = await taskRef.get();
    if (!taskDoc.exists || taskDoc.data().userId !== userId) {
      return res.status(404).send('Task not found');
    }

    const deleteResult = await taskRef.delete();

    if (deleteResult.writeTime) {
      return res.status(200).send('Task deleted');
    } else {
      return res.status(404).send('Task not found');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error');
  }
});

exports.app = functions.https.onRequest(app);