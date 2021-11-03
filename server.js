const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;  // 1.추가

let db; // 2. DB 변수 하나를 생성

app.use(express.urlencoded({extended: true}))  

//3. 아래 코드 수정
MongoClient.connect('mongodb+srv://jojin7437:fkdlcb19@cluster0.hgyz4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',(error, client)=>{
  if (error) return console.log(error);
  db = client.db('Cluster0'); //4. 클러스터 데이터베이스를 db변수에 저장(cluster-collections-add my own data 의 데이터베이스 제목)
  app.listen(8080, ()=>{
    console.log('포트번호 8080 서버접속');
  });
});

app.get('/product', (req, res)=>{  
  res.send('상품페이지');
});

app.get('/', (req, res)=>{ 
  res.sendFile(__dirname +'/index.html') 
 });  

 app.get('/input', (req, res)=>{ 
  res.sendFile(__dirname +'/input.html')
});

app.post('/add', (req, res)=>{     
  res.send('전송완료');
  //5. 아래 코드 추가하여 post로 input데이터를 MongoDB에 저장
  db.collection('post').insertOne({제목 : req.body.title, 내용 : req.body.content} , ()=>{
    console.log('저장완료');
  });
});