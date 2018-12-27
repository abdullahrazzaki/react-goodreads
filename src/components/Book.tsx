class BookSuggestion {
  id: number;
  title: string;
  author: string;
  constructor(id: number, name: string, author: string) {
    this.id = id;
    this.title = name;
    this.author = author;
  }
}

export default BookSuggestion;
