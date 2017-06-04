package com.loganmccloskey;

import java.util.ArrayList;
import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.loganmccloskey.domain.Movie;
import com.loganmccloskey.repositories.MovieRepository;

@SpringBootApplication
public class MoviedbApplication implements CommandLineRunner {

	static final Logger logger = LoggerFactory.getLogger(MoviedbApplication.class);
	
	private final MovieRepository repository;

	@Autowired
	public MoviedbApplication(MovieRepository repository) {
		this.repository = repository;
	}

	public static void main(String[] args) {
		SpringApplication.run(MoviedbApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		repository.deleteAll();

		// save a couple of movies 
		repository.save(new Movie("120", "The Lord of the Rings: The Fellowship of the Ring", "2001-12-18", "7.77",
				"Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bilbo, must leave his home in order to keep it from falling into the hands of its evil creator. Along the way, a fellowship is formed to protect the ringbearer and make sure that the ring arrives at its final destination: Mt. Doom, the only place where it can be destroyed.",
				"https://image.tmdb.org/t/p/w92/bxVxZb5O9OxCO0oRUNdCnpy9NST.jpg", new ArrayList<String>(Arrays.asList("Adventure", "Fantasy", "Action"))));

		// fetch an individual movie
		System.out.println("Movie found with findByTitle('The Lord of the Rings: The Fellowship of the Ring'):");
		System.out.println("--------------------------------");
		System.out.println(repository.findByTitle("The Lord of the Rings: The Fellowship of the Ring"));

	}

}
