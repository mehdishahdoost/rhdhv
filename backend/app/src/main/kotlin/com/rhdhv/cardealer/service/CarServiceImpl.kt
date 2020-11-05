package com.rhdhv.cardealer.service

import CarServiceGrpcKt
import com.rhdhv.cardealer.repository.CarRepository
import com.rhdhv.cardealer.repository.model.CarDocument

/**
 *
 * @author Mehdi Shahdoost
 */
class CarServiceImpl : CarServiceGrpcKt.CarServiceCoroutineImplBase() {

    /**
     * Adds new car to database
     */
    override suspend fun addCar(request: CarOuterClass.Car): CarOuterClass.GeneralResponse {
        val carDocument = CarDocument(request.brand, request.model, request.releaseYear, request.annualMaintenanceCost,
                request.make, request.fuelConsumption, request.version, request.price)
        val carRepository = CarRepository()
        val successful = carRepository.insert(carDocument).wasAcknowledged()
        return if (successful) makeMessage(false, "Car saved successfully!") else
            makeMessage(true, "Ops! failed!")
    }

    /**
     * Retrieves all cars with filter {CarOuterClass.CarRequest} from database
     */
    override suspend fun getCars(request: CarOuterClass.CarRequest): CarOuterClass.CarsResponse {
        val carRepository = CarRepository()
        val carDocuments = carRepository.getCars(request)
        val carList = convertToCarList(carDocuments.second)
        return CarOuterClass.CarsResponse.newBuilder().addAllCars(carList).setTotalPage(carDocuments.first).build()
    }

    /**
     * Retrieves all cars with {CarOuterClass.RecommendationRequest} filter
     */
    override suspend fun getRecommendationCars(request: CarOuterClass.RecommendationRequest): CarOuterClass.CarsResponse {
        val carRepository = CarRepository()
        val recommendationCars = carRepository.getRecommendationCars(request)
        val cars = convertToCarList(recommendationCars.second)
        return CarOuterClass.CarsResponse.newBuilder().setTotalPage(recommendationCars.first).addAllCars(cars).
        build()
    }

    private fun makeMessage(failed: Boolean, message: String): CarOuterClass.GeneralResponse {
        return CarOuterClass.GeneralResponse.newBuilder().setFailed(failed).setMessage(message).build()
    }

    private fun convertToCarList(cars: List<CarDocument>): List<CarOuterClass.Car> {
        return cars.map {
            CarOuterClass.Car.newBuilder().setModel(it.model).setBrand(it.brand).setPrice(it.price).setVersion(it.version).
            setFuelConsumption(it.fuelConsumption).
            setAnnualMaintenanceCost(it.annualMaintenanceCost).
            setReleaseYear(it.releaseYear).setMake(it.make).build()
        }
    }
}
