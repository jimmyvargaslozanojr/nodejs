const express = require('express')
const app = express()

let blogs = [
    {
        id: 1,
        title: 'blog 1'
    },
    {
        id: 2,
        title: 'blog 2'
    },
]
app.use(express.json())

app.get('/blogs', (req, res) => {
    res.status(200).json(blogs)
})

app.post('/blogs', (req, res) => {
    const body = req.body
    blogs.push({...body,id: blogs.length + 1})
    res.send('New blog added successfully')
})

app.put('/blogs/:id', (req, res) => {
    const id = req.params.id
    const { title } = req.body
    blogs.map(blog => {
        if (blog.id == id) {
            blog.title = title
            res.send('Blog updated successfully')
        }
    })
})

app.delete('/blogs/:id',(req,res)=>{
    const id = req.params.id
    blogs = blogs.filter(blog => {
        return blog.id !== parseInt(id)})

    res.send('Blog deleted successfully')
})
app.listen(5000,()=> console.log('Server is listening on: http://localhost:5000'))