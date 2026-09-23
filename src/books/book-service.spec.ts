import { beforeEach, describe, expect, it } from 'vitest';

import type { Book } from './book';
import { BookService } from './book-service';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    service = new BookService();
  });

  it('should add a book correctly', () => {
    const book: Book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    const result = service.addBook(book);

    expect(result).toBe(true);
  });

  // Test : L'ajout d'un livre sans titre ne doit pas fonctionner
  it("adding an untitled book shouldn't work", () => {
    const book: Book = {
      id: 10,
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    const result = service.addBook(book);

    expect(result).toBeFalsy();
  })

  // Test : L'ajout d'un livre ayant totalCopies à 0 ou négatif ne doit pas fonctionner
  it("adding book with totalCopies equal to 0 or a negative number shouldn't work", () => {
    const book: Book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 0,
    }

    const result = service.addBook(book);

    expect(result).toBeFalsy();
  })

  // Test : Emprunter un livre doit décrémenter availableCopies
  it("borrowing a book should decrement availableCopies", () => {
    const book: Book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    }

    service.addBook(book);
    service.borrowBook(book.id);

    expect(book.availableCopies).equal(0);
  })

  // Test : Ne pas emprunter un livre dont availableCopies est égal à 0
  it("shouldn't borrowing book if availableCopies equal to 0", () => {
    const book: Book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 0,
      totalCopies: 1,
    } 

    service.addBook(book);
    const result = service.borrowBook(book.id);

    expect(result).toBeFalsy();
  })

  // Test : Ne pas emprunter un livre qui n'existe pas
  it("shouldn't be able to borrow a book that doesn'texists", () => {
    const result = service.borrowBook(10)
    expect(result).toBeFalsy();
  })

  // Test : Retourner un livre doit incrémenter availableCopies
  it("return a book should increment availableCopies", () => {
    const book: Book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 2,
    } 

    service.addBook(book)
    service.returnBook(book.id);

    expect(book.availableCopies).equal(2);
  })

  // Test : Ne pas retourner un livre qui n'existe pas
  it("do not return a book that doesn't exists", () => {
    const result = service.returnBook(10);
    expect(result).toBeFalsy();
  })

  // Test : Ne pas retourner un livre dont toutes les copies ont déjà été rendues
  it("do not return a book if all copies have already been returned", () => {
    const book: Book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    } 

    service.addBook(book)
    const result = service.returnBook(book.id);

    expect(result).toBeFalsy();
  })

  // Ajoute des tests de ton choix pour les autres méthodes

  // Test : La modification d'un livre se fait correctement
  it("should update book", () => {
    const book: Book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    }

    service.addBook(book);

    const bookToUpdate: Book = {
      id: 10,
      title: 'Book to update',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    }

    const result = service.updateBook(bookToUpdate);

    expect(result).toBe(true);
  })

  // Test : Ne doit pas modifier un livre s'il n'existe pas
  it("does not update book if not exists", () => {
    const book: Book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 2,
    }

    expect(service.updateBook(book)).toBeFalsy();
  })


});
