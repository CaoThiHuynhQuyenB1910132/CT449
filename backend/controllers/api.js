const Book = require("../models/books");
const fs = require("fs");

module.exports = class API {
  static async allBook(req, res) {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async oneBook(req, res) {
    const id = req.params.id;
    try {
      const book = await Book.findById(id);
      if (!book) {
        res.status(400).json({
          message: "Không tìm thấy sách",
        });
      } else {
        res.status(200).json(book);
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async searchBook(req, res) {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.search || "";
      console.log(req.query);
      const books = await Book.find({
        name: { $regex: search, $options: "i" },
      })
        .skip(page * limit)
        .limit(limit);

      if (books.length === 0) {
        return res.status(400).json({
          msg: "Not found!",
        });
      } else {
        return res.status(200).json({
          msg: "Book",
          books: books,
        });
      }
    } catch (error) {
      return res.status(500).json({
        msg: "500 Server " + error,
      });
    }
  }

  static async create(req, res) {
    const book = req.body;
    const imgName = req.file.filename;
    book.img = imgName;
    console.log(book);
    try {
      const newBook = await Book.create(book);
      if (!newBook) {
        res.status(400).json({ message: "error." });
      } else {
        res.status(201).json({ message: "Book created successfully." });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    const id = req.params.id;
    let newImg = "";
    if (req.file) {
      newImg = req.file.filename;
      try {
        fs.unlinkSync("./uploads/" + req.body.old_img);
      } catch (error) {
        console.log(error);
      }
    } else {
      newImg = req.body.old_img;
    }
    const newBook = req.body;
    newBook.img = newImg;
    try {
      await Book.findByIdAndUpdate(id, newBook);
      res.status(200).json({ message: "Cập nhật thành công!" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    const id = req.params.id;
    try {
      const result = await Book.findByIdAndDelete(id);
      if (!result) {
        res.status(400).json({ message: "Không tìm thấy sách" });
      } else {
        fs.unlinkSync("./uploads/" + result.img);
        res.status(200).json({ message: "Xóa thành công!" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
//
