package com.rhdhv.cardealer.repository

import com.mongodb.client.model.Filters
import com.mongodb.client.result.InsertOneResult
import com.rhdhv.cardealer.const.SearchType
import org.litote.kmongo.reactivestreams.*  //NEEDED! import KMongo reactivestreams extensions
import org.litote.kmongo.coroutine.* //NEEDED! import KMongo coroutine extensions
import com.rhdhv.cardealer.repository.model.CarDocument
import org.bson.Document
import org.bson.conversions.Bson
import kotlin.math.ceil

/**
 * CarRepository - This class provides business logics for services
 *
 * @author Mehdi Shahdoost
 */
class CarRepository {

    suspend fun insert(carDocument: CarDocument): InsertOneResult {
        val collection = MongoDbConnector.getCollection("cars")
        return collection.insertOne(carDocument)
    }

    /**
     * Finds cars with user filters
     */
    suspend fun getCars(request: CarOuterClass.CarRequest): Pair<Int, List<CarDocument>> {
        val collection = MongoDbConnector.getCollection("cars")
        var countDocuments = collection.countDocuments()

        var cars: List<CarDocument>

        if (request.searchText.isNotEmpty()) {
            val filter = createFilter(request)
            countDocuments = collection.countDocuments(filter)
            cars = collection.find(filter).skip(request.pgSize * (request.pgNum - 1)).limit(request.pgSize).toList()
        } else {
            cars = collection.find().skip(request.pgSize * (request.pgNum - 1)).limit(request.pgSize).toList()
        }
        val totalPage = ceil(countDocuments.toDouble() / request.pgSize).toInt()
        return Pair(totalPage, cars)
    }

    /**
     * Finds cars match with user recommendation filter
     */
    suspend fun getRecommendationCars(request: CarOuterClass.RecommendationRequest): Pair<Int, List<CarDocument>> {
        val collection = MongoDbConnector.getCollection("cars")
        val fourYearMonths = 48
        val totalUserDistanceIn4Years = request.monthlyDistance * fourYearMonths
        val fuelPrice = request.fuelPrice
        val userExpectedFuelCost = (totalUserDistanceIn4Years * fuelPrice)
        val filter = Filters.where("function() {\n" +
                "   return (($totalUserDistanceIn4Years * this.fuelConsumption) * $fuelPrice) + this.annualMaintenanceCost < " +
                "$userExpectedFuelCost" +
                "}")
        val countDocuments = collection.countDocuments()
        val totalPage = ceil(countDocuments.toDouble() / request.pgSize).toInt()
        val filteredData = collection.find(filter).skip(request.pgSize * (request.pgNum - 1)).limit(request.pgSize).toList()
        return Pair(totalPage, filteredData)
    }

    private fun createFilter(request: CarOuterClass.CarRequest): Bson {
        return if (request.filter.ordinal == SearchType.YEAR.ordinal) {
            Filters.eq("releaseYear", request.searchText.toInt())
        } else {
            Filters.eq("brand", request.searchText)
        }
    }
}
