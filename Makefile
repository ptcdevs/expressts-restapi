#!make

init:
	npm init --yes
	npm install express dotenv
	npm i -D typescript @types/express @types/node
	npx tsc --init


