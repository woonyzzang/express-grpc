const express = require('express');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const app = express();
const port = 3000;

// gRPC 서비스 로드
const packageDefinition = protoLoader.loadSync('protos/example.proto');
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const { Greeter } = protoDescriptor.helloworld;

// gRPC 클라이언트 초기화
const client = new Greeter('localhost:50051', grpc.credentials.createInsecure());

// Express 라우트
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/hello/:name', (req, res) => {
    const name = req.params.name || 'world';

    // gRPC 클라이언트를 사용하여 서비스 호출
    client.sayHello({ name }, (error, response) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(response.message + '??');
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});