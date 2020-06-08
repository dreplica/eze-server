# eze-server

THis app is built using node transpiled from es6

- It has 5 end points
-- "/" is used to fetch random data, also when installed is used to check for incoming google api auth request
-- "/update" is used to refetch updates from google spreadsheet
-- "/sell" is used to fetch phones tyhat are available for sale
-- "/buy" is used to fetch phones that are available to used so they can buy
-- "/search" it fetches data based on filter

-- the application is already transpiled so you can run it if pulled with yarn start or visit the url above

-- I have provided available env. for use

-- the application works with 2 main filters - sort and size. sort is the max or min (represented in -1, 1) while size is the GB size

-- It enables pagination, 
    paginating for pages that fetches both sell and buy has a limit of 12, so in total it uses 24.
    when requesting data from both sides, since its different tables the provide the filtered version buit when requested more times, 
    is better to pass them as the come, else it would mix up the data.
    
-- Packages used include:
    Pm2 - it manages the app process especially on production so the app won't crash
    babel - used to transpile from es6 to es5
    
