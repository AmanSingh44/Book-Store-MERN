const express = require('express')
const Book = require('../model/book-model.js')
const bookRouter = express.Router()



//create book 
bookRouter.post('/', async(request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: 'Send all the required fields'
            })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }
        const book = await Book.create(newBook)
        return response.status(201).send(book)
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

//All books
bookRouter.get('/', async(request, response) => {
        try {
            const books = await Book.find()
            return response.status(200).json({
                count: books.length,
                data: books
            })
        } catch (error) {
            console.log(error.message)
            response.status(500).send({ message: error.message })
        }
    })
    //Get one book
bookRouter.get('/:id', async(request, response) => {
        try {
            const { id } = request.params
            const book = await Book.findById(id)
            return response.status(200).json(book)
        } catch (error) {
            console.log(error.message)
            response.status(500).send({ message: error.message })
        }
    })
    //update books
bookRouter.put('/:id', async(request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: 'Send all the required fields'
            })
        }
        const { id } = request.params
        const book = await Book.findByIdAndUpdate(id, request.body)
        return response.status(200).send({ message: "Book updated sucessfully" })

    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

//delete book
bookRouter.delete('/:id', async(request, response) => {
    try {
        const { id } = request.params
        const result = await Book.findByIdAndDelete(id)
        if (!result) {
            return response.status(404).json({ message: "Book not found" })
        } else {
            return response.status(200).json({ message: "Book deleted sucessfully" })
        }
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

module.exports = bookRouter