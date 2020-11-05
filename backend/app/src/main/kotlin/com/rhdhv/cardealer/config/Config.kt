package com.rhdhv.cardealer.config

import com.natpryce.konfig.ConfigurationProperties
import com.natpryce.konfig.Key
import com.natpryce.konfig.stringType

/**
 * Config - This class loads configs from config.properties file and return
 * each key by key name. First checks environment variable and if it doesnt
 * exists read it from  config.properties file.
 *
 * @author Mehdi Shahdoost
 */
object  Config {

    val config: ConfigurationProperties = ConfigurationProperties.fromResource("config.properties")

    private fun get(key: String): String {
        return config[Key(key, stringType)]
    }

    fun getValue(key: String): String {
        return System.getProperty(key) ?: get(key)
    }
}
