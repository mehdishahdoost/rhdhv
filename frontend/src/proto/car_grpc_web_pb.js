/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = require('./car_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.CarServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.CarServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Car,
 *   !proto.GeneralResponse>}
 */
const methodDescriptor_CarService_addCar = new grpc.web.MethodDescriptor(
  '/CarService/addCar',
  grpc.web.MethodType.UNARY,
  proto.Car,
  proto.GeneralResponse,
  /**
   * @param {!proto.Car} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.GeneralResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Car,
 *   !proto.GeneralResponse>}
 */
const methodInfo_CarService_addCar = new grpc.web.AbstractClientBase.MethodInfo(
  proto.GeneralResponse,
  /**
   * @param {!proto.Car} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.GeneralResponse.deserializeBinary
);


/**
 * @param {!proto.Car} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.GeneralResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.GeneralResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.CarServiceClient.prototype.addCar =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/CarService/addCar',
      request,
      metadata || {},
      methodDescriptor_CarService_addCar,
      callback);
};


/**
 * @param {!proto.Car} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.GeneralResponse>}
 *     Promise that resolves to the response
 */
proto.CarServicePromiseClient.prototype.addCar =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/CarService/addCar',
      request,
      metadata || {},
      methodDescriptor_CarService_addCar);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.CarRequest,
 *   !proto.CarsResponse>}
 */
const methodDescriptor_CarService_getCars = new grpc.web.MethodDescriptor(
  '/CarService/getCars',
  grpc.web.MethodType.UNARY,
  proto.CarRequest,
  proto.CarsResponse,
  /**
   * @param {!proto.CarRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.CarsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.CarRequest,
 *   !proto.CarsResponse>}
 */
const methodInfo_CarService_getCars = new grpc.web.AbstractClientBase.MethodInfo(
  proto.CarsResponse,
  /**
   * @param {!proto.CarRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.CarsResponse.deserializeBinary
);


/**
 * @param {!proto.CarRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.CarsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.CarsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.CarServiceClient.prototype.getCars =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/CarService/getCars',
      request,
      metadata || {},
      methodDescriptor_CarService_getCars,
      callback);
};


/**
 * @param {!proto.CarRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.CarsResponse>}
 *     Promise that resolves to the response
 */
proto.CarServicePromiseClient.prototype.getCars =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/CarService/getCars',
      request,
      metadata || {},
      methodDescriptor_CarService_getCars);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.RecommendationRequest,
 *   !proto.CarsResponse>}
 */
const methodDescriptor_CarService_getRecommendationCars = new grpc.web.MethodDescriptor(
  '/CarService/getRecommendationCars',
  grpc.web.MethodType.UNARY,
  proto.RecommendationRequest,
  proto.CarsResponse,
  /**
   * @param {!proto.RecommendationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.CarsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.RecommendationRequest,
 *   !proto.CarsResponse>}
 */
const methodInfo_CarService_getRecommendationCars = new grpc.web.AbstractClientBase.MethodInfo(
  proto.CarsResponse,
  /**
   * @param {!proto.RecommendationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.CarsResponse.deserializeBinary
);


/**
 * @param {!proto.RecommendationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.CarsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.CarsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.CarServiceClient.prototype.getRecommendationCars =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/CarService/getRecommendationCars',
      request,
      metadata || {},
      methodDescriptor_CarService_getRecommendationCars,
      callback);
};


/**
 * @param {!proto.RecommendationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.CarsResponse>}
 *     Promise that resolves to the response
 */
proto.CarServicePromiseClient.prototype.getRecommendationCars =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/CarService/getRecommendationCars',
      request,
      metadata || {},
      methodDescriptor_CarService_getRecommendationCars);
};


module.exports = proto;

