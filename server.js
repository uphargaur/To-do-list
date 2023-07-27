const express =require('express')
const app =express()

let task=['sample list']

app.use(express.urlencoded({extended :true}))
app.get('/',(req,res)=>
{
    let tasklist=task.map(t=>`<li> ${t}</li>`).join('\n')
    res.send(
    `<html>
    <body>
        <form action="/" method="POST">
            <input name="newtask">
            <button type="submit">
            ADD
            </button>
            <ul>
                ${tasklist}
            </ul>
        </form>
    </body>
    </html>`)
})

app.post(('/'),(req,res)=>
{
    // res.send('new task added ' + req.body.newtask)
    task.push(req.body.newtask)
    res.redirect('/')
    
})
app.listen(5555,()=>{
    console.log('started on http://localhost:5555')
})