package com.loganmccloskey.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.loganmccloskey.entities.Movie;

public interface MovieRepository extends MongoRepository<Movie, String> {
	
	public Movie findByTitle(String title);
}
