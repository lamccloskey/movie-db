package com.loganmccloskey.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.loganmccloskey.entities.Movie;
import com.loganmccloskey.repository.MovieRepository;

@Service
public class MovieServiceImpl implements MovieService {
	
	@Autowired
	private MovieRepository repository;

	@Override
	public List<Movie> findAll() {
		return repository.findAll();
	}

	@Override
	public Movie findById(String id) {
		return repository.findOne(id);
	}

	@Override
	public void delete(String id) {
		repository.delete(id);
	}

	@Override
	public Movie create(Movie movie) {
		return repository.insert(movie);
	}

	@Override
	public Movie update(Movie movie) {
		return repository.save(movie);
	}

}