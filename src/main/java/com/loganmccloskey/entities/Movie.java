package com.loganmccloskey.entities;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class Movie {

	@Id
	private String id;

	private String title;
	
	private String release_date;
	
	private String vote_average;
	
	private String overview;
	
	private String poster;
	
	private List<String> genres;

	public Movie() {
	}

	public Movie(String title, String release_date, String vote_average, String overview, String poster, List<String> genres) {
		this.title = title;
		this.release_date = release_date;
		this.vote_average = vote_average;
		this.overview = overview;
		this.poster = poster;
		this.genres = genres;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getrelease_date() {
		return release_date;
	}

	public void setrelease_date(String release_date) {
		this.release_date = release_date;
	}

	public String getvote_average() {
		return vote_average;
	}

	public void setvote_average(String vote_average) {
		this.vote_average = vote_average;
	}

	public String getOverview() {
		return overview;
	}

	public void setOverview(String overview) {
		this.overview = overview;
	}

	public String getPoster() {
		return poster;
	}

	public void setPoster(String poster) {
		this.poster = poster;
	}

	public List<String> getGenres() {
		return genres;
	}

	public void setGenres(List<String> genres) {
		this.genres = genres;
	}

	public String toString() {
		return String.format(
				"Movie[title='%s', release_date='%s', vote_average='%s', overview='%s', poster='%s', genres='%s']", title,
				release_date, vote_average, overview, poster, genres);
	}
}
