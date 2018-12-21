const express = require('express');
const parser = require("react-xml-parser");
const fparser = require("fast-xml-parser");
const axios = require('axios');
const app = express();

app.get("/suggestions", function (req, res) {
    let keyword = req.param("keyword");
    if (keyword) {
        axios.get(`https://www.goodreads.com/search/index.xml`, {
            params: {
                key: "EcXsQYe942QoFS6FFq5Mw",
                search: "title",
                q: keyword
            }
        }).then((response) => {
            console.log(response.data);
//            console.log(parser.validate(response.data));
            const obj = new parser().parseFromString(response.data);
            console.log("Obj", obj);
            console.log();
            const books = obj.children[1].getElementsByTagName("work");
            const suggestions = (books.slice(0, 5).map((work) => {
                const bookObj = work.getElementsByTagName("best_book")[0];
                const title = bookObj.getElementsByTagName("title")[0].value;
                const author = bookObj.getElementsByTagName("author")[0].getElementsByTagName("name")[0].value;
                const id = bookObj.getElementsByTagName("id")[0].value;
                return {title: title, author: author, id: id};
            }));
            let count = parseInt(obj.children[1].getElementsByTagName("total-results")[0].value);
            let result = {suggestions: suggestions, count: count - suggestions.length};
            console.log(suggestions);
            res.json(result);
        }).catch((res) => console.log(res));
    }
});
app.get("/results", function (req, res) {
    let keyword = req.param("keyword");
    let page = req.param("page");
    if (!page)
        page = 1;
    page = parseInt(page);
    if (keyword) {
        axios.get(`https://www.goodreads.com/search/index.xml`, {
            params: {
                key: "EcXsQYe942QoFS6FFq5Mw",
                search: "title",
                q: keyword,
                page: page
            }
        }).then((response) => {
            console.log(response.data);
//            console.log(parser.validate(response.data));
            const obj = new parser().parseFromString(response.data);
            console.log("Obj", obj);
            console.log();
            const books = obj.children[1].getElementsByTagName("work");
            const suggestions = books.map((work) => {
                const bookObj = work.getElementsByTagName("best_book")[0];
                const title = bookObj.getElementsByTagName("title")[0].value;
                const author = bookObj.getElementsByTagName("author")[0].getElementsByTagName("name")[0].value;
                const id = bookObj.getElementsByTagName("id")[0].value;
                return {title: title, author: author, id: id};
            });
            const count = parseInt(obj.children[1].getElementsByTagName("total-results")[0].value);
            const currentOffset = parseInt(obj.children[1].getElementsByTagName("results-end")[0].value);
            const nextPage = (currentOffset < count) ? page + 1 : -1;
            const result = {suggestions: suggestions, nextPage: nextPage};
            console.log(suggestions);
            res.json(result);
        }).catch((res) => console.log(res));
    }

});
app.get("/book", function (req, res) {
    //res.setHeader("Content-Type","application/json");
    let id = req.param("id");
    if (id) {
        axios.get(`https://www.goodreads.com/book/show`, {
            params: {
                key: "EcXsQYe942QoFS6FFq5Mw",
                search: "title",
                id: id,
                text_only: true
            }
        }).then((response) => {
//            console.log(response.data);
//            console.log(parser.validate(response.data));
            let o = fparser.parse(response.data);
            console.log("k", o.GoodreadsResponse.book);//,fparser.convertToJsonString(o));

            //          console.log("Obj",obj);
//            console.log();
//             const bookObj = obj.children[1];
//             const title = bookObj.getElementsByTagName("title")[0].value;
//             const authors = bookObj.getElementsByTagName("authors")[0].getElementsByTagName("author").map((author)=>author.getElementsByTagName("name")[0].value);
//             const image = bookObj.getElementsByTagName("image_url")[0].value;
// //            review_widget = review_widget.value;
//             const rating = bookObj.getElementsByTagName("average_rating")[0].value;
//             let review_widget = response.data.substr(response.data.indexOf("<reviews_widget")).split("<reviews_widget>")[1];
//             review_widget = review_widget.split("</reviews_widget>")[0];//(widget_regex);//bookObj.getElementsByTagName("reviews_widget")[0];
            const bookObj = o.GoodreadsResponse.book;
            const title = bookObj.title;
            console.log(bookObj.authors);
            let authors = bookObj.authors.author;
            if (!Array.isArray(authors))
                authors = [authors];

            authors = authors.map((author) => author.name);
            const image = bookObj.image_url;//.getElementsByTagName("image_url")[0].value;
//            review_widget = review_widget.value;
            const rating = bookObj.average_rating;
            let review_widget = bookObj.reviews_widget;//response.data.substr(response.data.indexOf("<reviews_widget")).split("<reviews_widget>")[1];
//            review_widget = review_widget.split("</reviews_widget>")[0];//(widget_regex);//bookObj.getElementsByTagName("reviews_widget")[0];

            console.log(review_widget);
            const result = {
                id: id,
                authors: authors,
                image: image,
                title: title,
                review_widget: review_widget,
                rating: rating
            };
            //          console.log(result);
            res.json(result);
        }).catch((res) => console.log(res));
    }

});

app.listen(8080);