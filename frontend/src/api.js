import axios from 'axios';
const url = "api/book";

export default class API {
    static async allBook(){
        const res = await axios.get("http://localhost:5000/api/books");
        return res.data;
 
    }

    static async oneBook(id){
        const res = await axios.get(`http://localhost:5000/api/books/${id}`);
        return res.data;
    }

    static async searchBook(id){
        // const res = await axios.get(`http://localhost:5000/api/books/${id}`);
        // return res.data;
    }

    static async create(book){
        const res = await axios.post("http://localhost:5000/api/books", book);
        return res.data;
    }

    static async update(id, book){
        const res = await axios.patch(`http://localhost:5000/api/books/${id}`, book);
        return res.data;
    }

    static async delete(id){
        const res = await axios.delete(`http://localhost:5000/api/books/${id}`);
        return res.data;
    }

}