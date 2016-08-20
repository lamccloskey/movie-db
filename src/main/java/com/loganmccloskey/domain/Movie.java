package com.loganmccloskey.domain;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class Movie {

	@Id
	private String _id;
	
	// id from themoviedb.org
	@Indexed(unique=true)
	@Field(value="imdbId")
	private String id;

	private String title;

	private String release_date;

	private String vote_average;

	private String overview;

	private String poster;

	private List<String> genres;

	public Movie() {
	}

	public Movie(String id, String title, String release_date, String vote_average, String overview, String poster,
			List<String> genres) {
		this.id = id;
		this.title = title;
		this.release_date = release_date;
		this.vote_average = vote_average;
		this.overview = overview;
		this.poster = poster;
		this.genres = genres;
	}
	
	

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
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

	public String getRelease_date() {
		return release_date;
	}

	public void setRelease_date(String release_date) {
		this.release_date = release_date;
	}

	public String getVote_average() {
		return vote_average;
	}

	public void setVote_average(String vote_average) {
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
				"Movie[id='%s' title='%s', release_date='%s', vote_average='%s', overview='%s', poster='%s', genres='%s']",
				id, title, release_date, vote_average, overview, poster, genres);
	}
}
