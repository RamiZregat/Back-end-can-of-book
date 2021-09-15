'use strict';

require('dotenv').config();
const express =require ('express');
const cors = require('cors');
const server=express();
server.use(cors());
const PORT=process.env.PORT;
server.use(express.json());

const mongoose = require('mongoose');

main().catch(err => console.log(err));

let Book;
async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  const BookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    email: String,
  });
   Book = mongoose.model('Book', BookSchema);
  
//   seedData();
}

async function  seedData(){
    const Book1=new Book({
        title: 'The Wealth of Nations',
        description:'Right from examining the division of labour, the origin and use of money and the division of stock, to the rise and progress of cities and towns after the fall of the Roman Empire, the systems of political economy and the taxes on various private revenues, Adam Smith’s The Wealth of Nations provides an extensive assessment of the creation of a nation’s wealth.',
        status:'In stock.',
        email:'rami.zregat97@gmail.com',
    })
    const Book2=new Book({
        title:'Make Your Own Luck',
        description:'How to Increase Your Odds of Success in Sales, Startups, Corporate Career and Life',
        status:'Out of stock',
        email:'rami.zregat97@gmail.com',
    })
    const Book3=new Book({
        title:'The Law of Success in Sixteen Lessons ',
        description:'From helping you rid yourself of aimlessness and find a definite purpose to teaching you the art of negotiating harmoniously with others, this course on the fundamentals of success will guide you, lesson by lesson, through the sixteen laws of success.',
        status:'In stock',
        email:'rami.zregat97@gmail.com',
    })
    await Book1.save();
    await Book2.save();
    await Book3.save();
}


// http://localhost:3010/books?emailuser=email
server.get('/books',getBooksHandler)
// http://localhost:3010/addbooks
server.post('/addbooks',addBooksHandler)
// http://localhost:3010/deletebooks/id?email=email
server.delete('/deletebooks/:id',deleteBooksHandler)
// http://localhost:3010/putBooksHandler/id?
server.put('/updatebooks/:id',updateBooksHandler)



function getBooksHandler(req,res){
    const emailuser=req.query.email;
Book.find({email:emailuser},(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        res.send(result);
    }
})

}


function addBooksHandler(req,res){
    const {title,description,status,email}=req.body;
    // const title = req.body.title
    // const description = req.body.description
    // const status = req.body.status
    // const email = req.body.email
    Book.create({title,description,status,email})
    // title:title,
    // description:description,
    // status:status,
    // email:email,
    Book.find({email:email},(err,result)=>{
        if(err){
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    })
}

function deleteBooksHandler(req,res){
    const id=req.params.id
    const emailuser=req.query.email

    Book.deleteOne({_id:id},(err,result)=>{
        Book.find({email:emailuser},(err,result)=>{
        if(err){
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    })
    })
}

function updateBooksHandler(req,res){
    const id = req.params.id
    const {title,description,status,email}=req.body

    Book.findByIdAndUpdate(id,{title,description,status,email},(err,result)=>{
        Book.find({email:email},(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        })
    })
}

server.listen(PORT, () => {
console.log(`listening on ${PORT}`);
})

