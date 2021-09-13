'use strict';

require('dotenv').config();
const express =require ('express');
const cors = require('cors');
const server=express();
server.use(cors());
const PORT=process.env.PORT;

const mongoose = require('mongoose');

main().catch(err => console.log(err));

let Book;
async function main() {
  await mongoose.connect('mongodb://localhost:27017/UserBook');

  const BookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    email: String,
    posterURL: String
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
        posterURL:'https://images-na.ssl-images-amazon.com/images/I/510PLv185uS._SX460_BO1,204,203,200_.jpg'
    })
    const Book2=new Book({
        title:'Make Your Own Luck',
        description:'How to Increase Your Odds of Success in Sales, Startups, Corporate Career and Life',
        status:'Out of stock',
        email:'rami.zregat97@gmail.com',
        posterURL:'https://images-na.ssl-images-amazon.com/images/I/41GhlX5jY1L._SX460_BO1,204,203,200_.jpg'
    })
    const Book3=new Book({
        title:'The Law of Success in Sixteen Lessons ',
        description:'From helping you rid yourself of aimlessness and find a definite purpose to teaching you the art of negotiating harmoniously with others, this course on the fundamentals of success will guide you, lesson by lesson, through the sixteen laws of success.',
        status:'In stock',
        email:'rami.zregat97@gmail.com',
        posterURL:'https://images-na.ssl-images-amazon.com/images/I/41Kq6PplOXS._SX460_BO1,204,203,200_.jpg'
    })
    await Book1.save();
    await Book2.save();
    await Book3.save();
}

server.get('/', homeHandler);
// http://localhost:3010/books
server.get('/books',getBooksHandler)


function homeHandler(req,res){

    res.send('Home Page');
}


function getBooksHandler(req,res){
Book.find({},(err,result)=>{
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
server.listen(PORT, () => {
console.log(`listening on ${PORT}`);
})
