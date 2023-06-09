#!make

init:
	npm init --yes
	npm install express dotenv
	npm i -D typescript @types/express @types/node
	npx tsc --init

npm-i:
	npm install -D concurrently nodemon
	npm i

dist:
	npm run build

run: dist
	npm run dev