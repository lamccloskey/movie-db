package com.loganmccloskey;

import java.util.ArrayList;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.loganmccloskey.entities.Movie;
import com.loganmccloskey.repository.MovieRepository;

@SpringBootApplication
public class MoviedbApplication implements CommandLineRunner {

	@Autowired
	private MovieRepository repository;

	public static void main(String[] args) {
		SpringApplication.run(MoviedbApplication.class, args);
	}
	

	@Override
	public void run(String... args) throws Exception {

		repository.deleteAll();

		// save a couple of movies
		repository.save(new Movie("3242", "Something About Mary", "1997", "4", "Getting in the heat of ...", "app/images/noposter.png",
				new ArrayList<String>(Arrays.asList("Comedy"))));
		repository.save(new Movie("9043", "Heat", "2000", "7.4", "One night long ago ...", "app/images/noposter.png",
				new ArrayList<String>(Arrays.asList("Action", "Thriller"))));

		// fetch all movies
		System.out.println("Movies found with findAll():");
		System.out.println("-------------------------------");
		for (Movie movie : repository.findAll()) {
			System.out.println(movie);
		}
		System.out.println();

		// fetch an individual movie
		System.out.println("Movie found with findById('9043'):");
		System.out.println("--------------------------------");
		System.out.println(repository.findByTitle("Heat"));
		
	}

}
