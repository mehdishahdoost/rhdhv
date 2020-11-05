package com.rhdhv.cardealer.repository.model

/**
 * CarDocument - This class model a car to save in database.
 * @author Mehdi Shahdoost
 */
data class CarDocument(val brand: String, val model: String,
                       val releaseYear: Int, val annualMaintenanceCost: Float,
                       val make: String, val fuelConsumption: Float, val version: String,
                       val price: Float)
