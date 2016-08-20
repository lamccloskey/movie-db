package com.loganmccloskey.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.loganmccloskey.domain.Movie;
import com.loganmccloskey.services.MovieService;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

	private final MovieService service;
	 
    @Autowired
    MovieController(MovieService service) {
        this.service = service;
    }
    
	@RequestMapping(method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<List<Movie>> getAll() {
		List<Movie> movies = service.findAll();
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.setContentType(MediaType.APPLICATION_JSON);
	    return new ResponseEntity<List<Movie>>(movies, responseHeaders, HttpStatus.OK);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<Movie> getOne(@PathVariable("id") String id) {
		Movie movie = service.findById(id);
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.setContentType(MediaType.APPLICATION_JSON);
	    return new ResponseEntity<Movie>(movie, responseHeaders, HttpStatus.OK);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public ResponseEntity<HttpStatus> deleteOne(@PathVariable("id") String id) {
		service.delete(id);
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST, produces = "application/json")
	public ResponseEntity<?> postOne(@RequestBody Movie movie) {
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.setContentType(MediaType.APPLICATION_JSON);
		
		try{
			movie = service.create(movie);
			return new ResponseEntity<Movie>(movie, responseHeaders, HttpStatus.CREATED);
		}catch(DuplicateKeyException ex){
			ex.printStackTrace();
			return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
		}
		
		
	}

}
