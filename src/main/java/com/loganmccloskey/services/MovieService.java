package com.loganmccloskey.services;

import java.util.List;

import com.loganmccloskey.domain.Movie;

public interface MovieService {

	public List<Movie> findAll();

	public Movie findById(String id);

	public void delete(String id);

	public Movie create(Movie movie);

}
