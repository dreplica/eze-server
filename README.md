# eze-server 
end point here https://eze-test.herokuapp.com/

# design style
- I used a Model, Controller , route pattern including  a logic folder
    - this helps me access my files easily and creates a better architecture for the workspace
    - also if i want to change to a different db, i just have to change my model, without affecting other files like routes, 
      but little changes to controllers, also if i was to use graphql, changes to this pattern would be minimal

## This app is built using node transpiled from es6
- Note: (please use the develop branch for development, master branch package.json is configured for production)
- the application is already transpiled so you can run it if pulled with yarn start or visit the url above
- I have provided available env. for use
- It has 2 end points which takes various filter query strings 
- '/' is for configuration with google auth
- '/api' is for endpoint communication to client

## Query strings
- the query strings included are :
    - min: it takes a minimum price value to be processed 
    - max: it takes a maximum price value
    - condition: takes the kind of condition user requeest for
    - size: takes storage size value
    - limit: takes the maximum data to be returned as response
    - page: used for pagination, to access the current page needed by user
    - phone: used to specify the sought of iphone needed

- It enables pagination, 
    paginating for all pages has a limit of 6
    
# Packages used include:
    Pm2 - it manages the app process especially on production so the app won't crash
    babel - used to transpile from es6 to es5
    regenerator-runtime: for regenerator compiling
    mongoose and mongodb: for database management
    googleapis: used to communicate with google spreadsheet as to fetch the datas and populating to db
    mongodb-memory-server: for testing DB in realtime
    supertest: for testing api
    
