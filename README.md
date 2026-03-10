# Portfolio Website

### Created by Jack Wagenheim

This is a portfolio website that I created to keep all my work in one place. It can be found at https://www.jackwagenheim.com or https://www.itchybarn.com, with the main domain being itchybarn.com.

## Frontend

Vite is used to create a frontend built with React and TypeScript. It can be run locally from `frontend/` with `npm install` (only necessary if it's the first time), and then activated with `npm run dev`.

Any time Nginx (or Vite, during local development) sees a request with a URL beginning with "/api/", it will know to forward that back to Flask.

## Backend

### Flask

Flask handles API routes, and is run using gunicorn from the `portfolio.service` file. Gunicorn reads `wsgi.py` to find the Flask app, and launches it on port 8000 (by default, but can be configured in `/etc/portfolio/env`). systemd manages gunicorn so that it boots up on start and auto-restarts on a crash.

### Nginx

The Nginx config files are broken up into dev and prod. In both, Nginx serves the built React app from frontend, and proxies any /api/ calls to Flask. The difference lies in that in prod, it applies certs for both jackwagenheim.com and itchybarn.com, but always redirects to itchybarn.com. Whereas in dev, it only sets up config for dev.itchybarn.com. There also exists a bootstrap configuration, which creates a temporary HTTP-only config during the initial setup before the SSL certs exist.

### Env System

The `env.sh` script is sourced by other scripts, and keeps track of whether to use the dev or main branch. This is used by those other scripts to decide things such as which Nginx file should run and which certificates are used. It is also used to create a `/etc/portfolio/env` file by `create_env.sh`.

### Certbot

Certbot is used to create certificates for the domains. This requires the dev server to be open on port 80 (HTTP) so that the certbot can perform an ACME challenge. However, users on port 80 are redirected to port 443 (HTTPS), which can have its restrictions configured separately so that no unwanted visitors reach the dev site.

## Deployment

### AWS Deployment

The site uses two different servers, both hosted on AWS. One server is dev, and the other one is production. They can both be deployed using `deploy_dev.sh` and `deploy_prod.sh` (ssh into dev, and only from there can you ssh into prod), which, by default, runs `deploy.sh` on the respective server. Although the script run can be modified with a `SCRIPT` parameter when running the shell script. I mostly used this to specify that I wanted to call `bootstrap.sh` (handles creating the repo, installing requirements, etc) instead.

### AWS EC2 Instance Creation

To create a new EC2 instance that works with the systems, the following steps would be taken. I'll walk through creating a dev server for a new domain using the repo.

1. Create a new EC2 instance with port 80 open to all IPs, and ports 22 and 443 available to (preferably) you. Launch the instance.
2. Point the dev domain to the new server's IP.
3. Create a `dev` ssh alias, pointing to the server. Shell scripts in the repo will use this.
4. SSH into the server by running `ssh dev`. Run `git clone https://github.com/itchybarn/PortfolioWebsite.git /home/ec2-user/portfolio`.
5. Work through all three Nginx config files and `setup_https.sh` to use custom own domain name(s).
6. Move into the directory using `cd /home/ec2-user/portfolio/scripts` and run the startup script `ENV=dev ./startup.sh`, specifying with a parameter that this is the dev branch.

The same steps would generally be taken for production, with the exceptions being in the security groups only allowing ssh from the dev server's IP and that the ssh alias name should be prod. `ENV=prod` would also be specified in step #6.

## Misc

### Extra Cool Resources

[Create a React + Flask Project in 2025, by Miguel Grinberg](https://blog.miguelgrinberg.com/post/create-a-react-flask-project-in-2025)
[background-blend-mode Problems, solution by Sparronator](https://github.com/mdn/browser-compat-data/issues/20308)

### AI Usage

AI was used purely for learning purposes within this project. Although I do use AI for advice, double-checking work, and some guidance, everything in the repo is written by me, including this README.
