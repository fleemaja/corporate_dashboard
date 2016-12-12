"Corporate Dashboard" is a front-end demo app made with the Angular front-end framework and the d3 data visualization library.

Live site: [https://fleemaja.github.io/corporate_dashboard/](https://fleemaja.github.io/corporate_dashboard/)

![Corporate Dashboard](http://res.cloudinary.com/dkw0kkkgd/image/upload/v1481583772/Screen_Shot_2016-12-12_at_5.01.57_PM_mfvaoj.png)

### Local Setup
***

Clone this repo to your local machine by running `git clone https://github.com/fleemaja/corporate_dashboard.git` in the terminal.
Navigate to the project root and do the following:


##### 1. install 3rd party code/dependencies
  * run `npm install` to install the gulp build process node_modules

##### 2. gulp build process
  * install the gulp command line interface (if it's not already) with `sudo npm install --global gulp-cli`
  * run `gulp` if you want to make any changes to scripts or stylesheets (gulp does tasks like minifying css/js files)

##### 3. start the server
  * open a new terminal tab/window if you have gulp running
  * start a server using `python -m SimpleHTTPServer 8000` (or your preferred port number and way to start a server)
  * open `http://localhost:8000/` in a browser to use the web app
