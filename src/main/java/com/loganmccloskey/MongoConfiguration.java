package com.loganmccloskey;

import org.apache.log4j.spi.LoggerFactory;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

@Configuration
@EnableMongoRepositories
@ComponentScan(basePackageClasses = { MoviedbApplication.class })
public class MongoConfiguration extends AbstractMongoConfiguration {

	private String mongoURI = System.getenv("MONGODB_URI");

	@Override
	protected String getDatabaseName() {
		return "movie-db";
	}

	@Override
	@Bean
	public Mongo mongo() throws Exception {
		return new MongoClient(new MongoClientURI(mongoURI));
	}

	@Override
	protected String getMappingBasePackage() {
		return "com.loganmccloskey.domain";
	}
}
