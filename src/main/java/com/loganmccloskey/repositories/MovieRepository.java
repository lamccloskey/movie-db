package com.loganmccloskey.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.loganmccloskey.domain.Movie;

public interface MovieRepository extends MongoRepository<Movie, String> {
	
	public Movie findByTitle(String title);
}
