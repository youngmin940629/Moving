front 빌드 및 배포 순서
1. ssh -i J6C206T.pem ubuntu@j6c206.p.ssafy.io 입력
2. front 폴더로 이동
3. npm install 
4. npm run build
5. sudo npx pm2 start npm -- start (무중단 배포)
6. sudo npx pm2 kill (중단)
