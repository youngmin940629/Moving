# 프론트엔드

front 빌드 및 배포 순서

1. ssh -i J6C206T.pem ubuntu@j6c206.p.ssafy.io 입력
2. front 폴더로 이동
3. npm install 
4. npm run build
5. sudo npx pm2 start npm -- start (무중단 배포)
6. sudo npx pm2 kill (중단)





# 백엔드

1) 사용한 JVM, 웹서버

   - python 3.7.9 version , Django 3.2.3 version
   - 웹서버 : Amazon EC2

2) WAS 제품 등의 종류와 설정값

   - uWSGI

     ```ini
     // server.ini
     
     [uwsgi]
     chdir = /home/ubuntu/S06P22C206/back/
     module = server.wsgi:application
     home = /home/ubuntu/S06P22C206/back/venv/
     
     uid = ubuntu
     gid = ubuntu
     
     socket = /tmp/server.sock
     chmod-socket = 666
     chown-socket = ubuntu:ubuntu
     
     enable-threads = true
     master = true
     vacuum = true
     pidfile = /tmp/project_name.pid
     logto = /var/log/uwsgi/server/@(exec://date +%%Y-%%m-%%d).log
     log-reopen = true
     ```

     ```service
     // uwsgi.service
     
     [Unit]
     Description=uWSGI service
     After=syslog.target
     
     [Service]
     ExecStart=/home/ubuntu/S06P22C206/back/venv/bin/uwsgi -i /home/ubuntu/S06P22C206/back/.config/uwsgi/server.ini
     
     Restart=always
     KillSignal=SIGQUIT
     Type=notify
     StandardError=syslog
     NotifyAccess=all
     
     [Install]
     WantedBy=multi-user.target
     ```

     

   - Nginx

     ```config
     // server.conf
     
     server {
         listen 8000;
         server_name *.compute.amazonaws.com;
         charset utf-8;
         client_max_body_size 128M;
     
         location / {
             uwsgi_pass  unix:///tmp/server.sock;
             include     uwsgi_params;
         }
     
         location /static/ {
             alias /home/ubuntu/S06P22C206/back/static/;
         }
     }
     ```

     

3. 배포 시 특이사항 기재

   - 코드가 수정되어 변동사항이 생길 때 다음과 같이 입력해주면 적용됩니다.

   ```shell
   $ sudo systemctl daemon-reload
   $ sudo systemctl restart uwsgi nginx







