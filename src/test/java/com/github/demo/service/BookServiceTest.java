package com.github.demo.service;

import com.github.demo.model.Book;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.assertEquals;

/**
 * Unit test for BookService
 */
public class BookServiceTest {

    // Testing API token key
    private static final String API_TOKEN = "AIzaSyAQfxPJiounkhOjODEO5ZieffeBv6yft2Q";

    private BookService bookService;

    @Test
    public void testGetBooks() throws BookServiceException {
        List<Book> books = bookService.getBooks();
        assertEquals("list length should be 6", 6, books.size());
    }

    @Test
    public void testSearchBooks() throws BookServiceException {
        List<Book> books = bookService.searchBooks("Scrum");
        assertEquals("list length should be 1", 1, books.size());
    }

    @Test
    public void testSearchBooksByAuthor() throws BookServiceException {
        List<Book> books = bookService.searchBooksByAuthor("Eric Ries");
        assertEquals("list length should be 1", 1, books.size());
    }

    @Before
    public void setUp() throws Exception{
        bookService = new BookService();
    }

    @After
    public void tearDown() {
        bookService = null;
    }

}
