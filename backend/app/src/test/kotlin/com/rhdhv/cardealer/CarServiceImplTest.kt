package com.rhdhv.cardealer

import CarOuterClass
import CarServiceGrpcKt
import com.rhdhv.cardealer.repository.MongoDbConnector
import com.rhdhv.cardealer.service.CarServiceImpl
import io.grpc.testing.GrpcServerRule
import kotlinx.coroutines.runBlocking
import org.junit.Before
import org.junit.Rule
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.testcontainers.containers.MongoDBContainer
import org.testcontainers.containers.wait.strategy.Wait
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers
import java.time.Duration
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse


/**
 *
 * @author Mehdi Shahdoost
 */
@Testcontainers
class CarServiceImplTest {

    @get:Rule
    val grpcRule: GrpcServerRule = GrpcServerRule().directExecutor()

    @Container
    val mongoDBContainer: MongoDBContainer = MongoDBContainer("mongo:latest").apply {
        waitingFor(Wait.forListeningPort())
        withStartupTimeout(Duration.ofSeconds(180L))
        start()
    }

    @BeforeAll
    fun setUp() {
        System.setProperty("mongodb.url", mongoDBContainer.replicaSetUrl)
    }

    @Before
    fun cleanUp() {
        cleanDatabase()
    }

    @Test
    fun `insert a car successfully`() {
        grpcRule.serviceRegistry.addService(CarServiceImpl())
        val grp: CarServiceGrpcKt.CarServiceCoroutineStub = CarServiceGrpcKt.CarServiceCoroutineStub(grpcRule.channel)
        val car = createCarModel("Toyota", 2020)
        runBlocking {
            val generalResponse = grp.addCar(car)
            assertFalse { generalResponse.failed }
        }
    }

    @Test
    fun `retrieve all cars by blank search field`() {
        grpcRule.serviceRegistry.addService(CarServiceImpl())
        val grp: CarServiceGrpcKt.CarServiceCoroutineStub = CarServiceGrpcKt.CarServiceCoroutineStub(grpcRule.channel)
        val carRequest = CarOuterClass.CarRequest.newBuilder().setPgNum(1).setPgSize(3).setSearchText("").build();
        runBlocking {
            val car = createCarModel("Toyota", 2020)
            val car1 = createCarModel("Toyota", 2020)
            val car2 = createCarModel("Toyota", 2020)
            grp.addCar(car)
            grp.addCar(car1)
            grp.addCar(car2)
            val carResponse = grp.getCars(carRequest);
            assertEquals(3, carResponse.carsList.size)
            assertEquals(1, carResponse.totalPage)
        }
    }

    @Test
    fun `retrieve all cars by blank search field by page number`() {
        grpcRule.serviceRegistry.addService(CarServiceImpl())
        val grp: CarServiceGrpcKt.CarServiceCoroutineStub = CarServiceGrpcKt.CarServiceCoroutineStub(grpcRule.channel)
        val carRequest = CarOuterClass.CarRequest.newBuilder().setPgNum(4).setPgSize(3).setSearchText("").build();
        runBlocking {
            repeat((1..10).count()) {
                grp.addCar(createCarModel("Toyota", 2020))
            }
            val carResponse = grp.getCars(carRequest);
            assertEquals(1, carResponse.carsList.size)
            assertEquals(4, carResponse.totalPage)
        }
    }

    @Test
    fun `retrieve cars by brand filter search`() {
        grpcRule.serviceRegistry.addService(CarServiceImpl())
        val grp: CarServiceGrpcKt.CarServiceCoroutineStub = CarServiceGrpcKt.CarServiceCoroutineStub(grpcRule.channel)
        val carRequest = CarOuterClass.CarRequest.newBuilder().setPgNum(1).setPgSize(3).setSearchText("Benz").setFilter(CarOuterClass.CarRequest.SearchFilter.BRAND).build();
        runBlocking {
            repeat((1..5).count()) {
                grp.addCar(createCarModel("Toyota", 2020))
            }
            grp.addCar(createCarModel("Benz", 2020))
            val carResponse = grp.getCars(carRequest);
            assertEquals(1, carResponse.carsList.size)
            assertEquals("Benz", carResponse.carsList[0].brand)
        }
    }

    @Test
    fun `retrieve cars by year of release filter search`() {
        grpcRule.serviceRegistry.addService(CarServiceImpl())
        val grp: CarServiceGrpcKt.CarServiceCoroutineStub = CarServiceGrpcKt.CarServiceCoroutineStub(grpcRule.channel)
        val carRequest = CarOuterClass.CarRequest.newBuilder().setPgNum(1).setPgSize(6).setSearchText("2010").setFilter(CarOuterClass.CarRequest.SearchFilter.YEAR).build();
        runBlocking {
            repeat((1..5).count()) {
                grp.addCar(createCarModel("Toyota", 2010))
            }
            grp.addCar(createCarModel("Benz", 2020))
            val carResponse = grp.getCars(carRequest);
            assertEquals(5, carResponse.carsList.size)
            assertEquals(2010, carResponse.carsList[0].releaseYear)
        }
    }

    @Test
    fun `recommend cars by 10 km distance each month and 2€ fuel price`() {
        grpcRule.serviceRegistry.addService(CarServiceImpl())
        val grp: CarServiceGrpcKt.CarServiceCoroutineStub = CarServiceGrpcKt.CarServiceCoroutineStub(grpcRule.channel)
        val request = CarOuterClass.RecommendationRequest.newBuilder().setFuelPrice(2).
        setMonthlyDistance(10).setPgSize(5).setPgNum(1).build()
        runBlocking {
            grp.addCar(createCarModel("Benz", 2020, 200F, 0.02F))
            grp.addCar(createCarModel("BWM", 2020, 200F, 10F))
            val cars = grp.getRecommendationCars(request)
            assertEquals(1, cars.carsList.size)
            assertEquals("Benz", cars.carsList[0].brand)
        }
    }

    @AfterAll
    fun tearDownAll() {
        if (!mongoDBContainer.isShouldBeReused) {
            mongoDBContainer.stop()
        }
    }

    private fun createCarModel(brandName: String, yearOfRelease: Int,
                               annualMaintenanceCost: Float = 1F, fuelConsumption: Float = 1F): CarOuterClass.Car {
        return CarOuterClass.Car.newBuilder().setBrand(brandName).setMake("Toyota").
        setAnnualMaintenanceCost(annualMaintenanceCost).setReleaseYear(yearOfRelease).setPrice(1200F).
        setFuelConsumption(fuelConsumption).setModel("Toyota Yaris 2018").setVersion("2").build()
    }

    private fun cleanDatabase() {
        runBlocking {
            MongoDbConnector.getCollection("cars").deleteMany()
        }
    }

}
