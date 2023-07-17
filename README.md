Python 3.9.12 was used for development

Make Virtual Environment\
virtual environment example

# Creates the virtual env
mkvirtualenv {Environment Name}

# Installs dependencies
pip install -r requirements.txt

# Update list of dependencies
pip freeze > requirements.txt

# Set up Environment Variables
API KEYS\
<ins>Docker</ins>\
Create a env file with any name. ex. "env_enroute"\
The file's contents should have these lines\
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
export AWS_ACCESS_KEY_ID="{AWS_ACCESS_KEY_ID}"
export AWS_SECRET_ACCESS_KEY="{AWS_SECRET_ACCESS_KEY}" // for zappa

Go to .../virtualenvs/{Name of virtual env}/bin/postdeactivate\
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
zappa update dev
zappa deploy dev