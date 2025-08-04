import express from 'express';
import bodyParser from 'body-parser';
import {fileURLToPath} from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home.ejs');
});

const posts = [];
app.get('/posts', (req, res) => {
    res.render('posts.ejs', { posts: posts });
});

app.get('/create', (req, res) => {
    res.render('create.ejs');
});
app.post('/create', (req, res) => { 
    const post = {
        title: req.body.title,
        content: req.body.content
    };
    posts.push(post);
    res.redirect('/posts');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});