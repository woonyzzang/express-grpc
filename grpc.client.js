const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// 프로토콜 버퍼 파일 로드
const packageDefinition = protoLoader.loadSync('protos/example.proto');
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const routes = protoDescriptor.helloworld;

function main() {
    // gRPC 클라이언트 초기화
    const client = new routes.Greeter('localhost:50051', grpc.credentials.createInsecure());

    // gRPC 서비스 호출 예제
    client.sayHello({name: 'you'}, function(error, response) {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Response:', response.message);
        }
    });
}

main();