const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// gRPC 서비스 로드
const packageDefinition = protoLoader.loadSync('protos/example.proto');
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const routes = protoDescriptor.helloworld;

function sayHello(call, callback) {
    console.log(call.request);
    callback(null, {message: `Hello, ${call.request.name}!`});
}

function main() {
    const server = new grpc.Server();

    server.addService(routes.Greeter.service, {SayHello: sayHello});
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log('gRPC server running at http://0.0.0.0:50051');
    });
}

main();