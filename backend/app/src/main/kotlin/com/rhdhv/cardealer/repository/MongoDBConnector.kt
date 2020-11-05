package com.rhdhv.cardealer.repository

import com.rhdhv.cardealer.config.Config
import com.rhdhv.cardealer.repository.model.CarDocument
import org.litote.kmongo.coroutine.CoroutineCollection
import org.litote.kmongo.coroutine.CoroutineDatabase
import org.litote.kmongo.coroutine.coroutine
import org.litote.kmongo.reactivestreams.KMongo


/**
 * MongoDbConnector - This class initiate a connection to mongodb database.
 *
 * @author Mehdi Shahdoost
 */
object MongoDbConnector {

    private val database: CoroutineDatabase = init()

    private fun init(): CoroutineDatabase {
        val client = KMongo.createClient(Config.getValue("mongodb.url")).coroutine
        return client.getDatabase(Config.getValue("mongodb.db.name"))
    }

    fun getCollection(collectionName: String): CoroutineCollection<CarDocument> {
        return database.getCollection(collectionName)
    }
}
