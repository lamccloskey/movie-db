package com.loganmccloskey.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.loganmccloskey.domain.Movie;
import com.loganmccloskey.repositories.MovieRepository;

@Service
public class MovieServiceImpl implements MovieService {

	private final MovieRepository repository;

	@Autowired
	public MovieServiceImpl(MovieRepository repository) {
		this.repository = repository;
	}

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
	public Movie create(Movie movie) throws DuplicateKeyException {
		return repository.save(movie);
	}

}