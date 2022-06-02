Make Virtual Enviroment\
virtual enviroemnt example

# Creates the virtual env
mkvirtualenv {Enviroment Name}

# Installs dependencies
pip install -r requirements.txt

# Update list of dependencies
pip freeze > requirements.txt

# Set up Enviroment Variables
API KEYS\
<ins>Docker</ins>\
Create a env file with any name. ex. "env_enroute"\
The file's contents should have these 2 lines\
GOOGLE_MAPS_API_KEY={API_KEY}\
YELP_API_KEY={API_KEY}\
After building the docker image, you must pass in the env file when running the docker image\
This is done by using the "--env-file" flag and then the file path to the env file\
ex. docker run -dp 8000:8000 --env-file {Entire file path to env file} {Name of Docker Image}

<ins>virtual environment wrapper</ins>

MAC\
Go to .../virtualenvs/{Name of virtual env}/bin/postactivate\
append these lines to the postactivate file\
export GOOGLE_MAPS_API_KEY='{API KEY}'\
export YELP_API_KEY='{API KEY}'

Got to .../virtualenvs/{Name of virtual env}/bin/postdeactivate\
append these lines to the postdeactivate file\
unset GOOGLE_MAPS_API_KEY\
unset YELP_API_KEY

WINDOWS\
Go to .../{Name of virtual env}/Scripts/activate.bat\
append these lines to the active file\
export GOOGLE_MAPS_API_KEY='{API KEY}'\
export YELP_API_KEY='{API KEY}'

Go to .../{Name of virtual env}/Scripts/deactivate.bat\
append these lines to the active file\
unset GOOGLE_MAPS_API_KEY\
unset YELP_API_KEY

# Production
docker-compose -f docker-compose.dev.yml down -v  // This will close docker instance \
docker-compose -f docker-compose.dev.yml up -d --build 

Production Build\
docker-compose down -v  // This will close docker instance \
docker-compose up -d --build 