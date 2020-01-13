const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const members = require('./Member');
const app = express();
const logger = require('./middleware/logger');


// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Member App',
    members
  })
);

//Init middleware
 app.use(logger);
/* app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
}); */

/* app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});  */


//Gets all members
app.get('/api/members', (req, res) =>
    {res.json(members)}
);

//get single member
app.get('/api/members/:id', (req, res) => {
    /* res.send(req.params.id); */
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({msg: `No member with the Id of ${req.params.id}`});
    }
})


app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>  console.log(`Server started on port ${PORT}`));
//37:46