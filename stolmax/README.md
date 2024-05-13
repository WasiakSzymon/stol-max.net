# Stolmax

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.




nginx:

https://robert-isaac.medium.com/deploying-angular-ssr-and-nestjs-application-to-vps-bf7e400a7b48

nginx -> sciezka na browser/index.html
revers proxy dla server/main.js


server {
        server_name stol-max.net;
        server_tokens off;

        sub_filter_once off;
        sub_filter random-csp-nonce $request_id;

        add_header Content-Security-Policy "default-src 'none'; manifest-src 'self' 'nonce-$request_id'; script-src 'self' 'nonce-$request_id'; style-src 'self' 'nonce-$request_id'; img-src * data: www.googletagmanager.com; base-uri 'self'; font-src 'self'; connect-src 'self' https://stol-max.net www.googletagmanager.com;" always;
>

        add_header Strict-Transport-Security "max-age=31536000; includeSubDomain; preload" always;
        add_header Permissions-Policy "geolocation=(),midi=(),sync-xhr=(),microphone=(),camera=(),autoplay=(),usb=(),gyroscope=(),fullscreen=(self),payment=()";
        add_header Referrer-Policy "same-origin" always;
        #add_header Content-Security-Policy "default-src 'self';" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Frame-Options "DENY" always;
        add_header X-Content-Type-Options "nosniff" always;
        root /home/sds87jksdm/repos/stol-max.net/stolmax/dist/stolmax/browser;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        gzip on;
        gzip_comp_level 5;
        gzip_min_length 1024;
        #gzip_proxied expired no-cache no-store private auth;
        gzip_proxied any;
        gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;
        gzip_disable "MSI [1-6]\.";
        gzip_vary on;
        location / {
                proxy_pass http://localhost:4000;

                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }

location ~* \.(jpg|jpeg|png|gif|swf|svg|ico|mp4|eot|ttf|otf|woff|woff2|css|js)$ {
    proxy_pass http://localhost:4000;
    add_header Cache-Control "max-age=86400, must-revalidate, s-maxage=2592000";
  }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/stol-max.net/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/stol-max.net/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = www.stol-max.net) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = stol-max.net) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        listen 80;
        server_name stol-max.net www.stol-max.net
        root /home/sds87jksdm/repos/stol-max.net/stolmax/dist/stolmax/browser;
    return 404; # managed by Certbot
}

