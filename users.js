const http = require('node:http')
const fs = require('fs')

let users = [
    {
        id: 1,
        name: 'user 1'
    },
    {
        id: 2,
        name: 'user 2'
    },
]

const server = http.createServer((req, res) => {
    const method = req.method
    if (req.url === '/users') {
        if (method === "GET") {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(users))
        } else if (method === 'POST') {
            let body = ''
            req.on('data', chunk => body += chunk.toString())
            req.on('end', () => {
                const newUser = Object.assign(JSON.parse(body), { id: users.length + 1 })
                users.push(newUser)
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(users))
            })
        }
        else if (method === 'PUT') {
            let body = ''
            req.on('data', chunk => body += chunk.toString())
            req.on('end', () => {
                const { id, name } = JSON.parse(body)
                const user = JSON.parse(body)

                users = users.map(p => {
                    if (p.id == user.id) {
                        return { ...p, ...user }
                    }
                    return p
                })
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(users))
            })
        }
        else {
            let body = ''
            req.on('data', chunk => body += chunk.toString())
            req.on('end', () => {
                const { id } = JSON.parse(body)
                users = users.filter(u => u.id !== id)
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(users))
            })
        }
    } else {
        const pageContent = fs.readFileSync('404.html')
        res.setHeader('Content-Type', 'text/html')
        res.end(pageContent)
    }
    
})

server.listen(
    5000,
    'localhost',
    ()=> console.log('Server is listening on: http://localhost:5000')
)
