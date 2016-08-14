package com.loganmccloskey.api;

import java.util.List;

import com.loganmccloskey.entities.Movie;

public interface MovieService {

	public List<Movie> findAll();

	public Movie findById(String id);

	public void delete(String id);

	public Movie create(Movie movie);

	public Movie update(Movie movie);
}
