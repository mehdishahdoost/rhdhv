package com.rhdhv.cardealer

import com.rhdhv.cardealer.config.Config
import com.rhdhv.cardealer.service.CarServiceImpl
import io.grpc.ServerBuilder
import mu.KotlinLogging;

private val logger = KotlinLogging.logger {}

/**
 * This function is entry point for creating gRPC server.
 *
 * @author Mehdi Shahdoost
 */

fun main() {
    val port = Config.getValue("grpc.server.port").toInt()
    val server = ServerBuilder.forPort(port).addService(CarServiceImpl()).build()
    server.start()
    logger.info { "gRPC server is up on port: $port" }
    Runtime.getRuntime().addShutdownHook(Thread {
        logger.info { "Shutting down server ..." }
        server.shutdown()
        logger.info { "Server shut down" }
    })
    server.awaitTermination()
}

