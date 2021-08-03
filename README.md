
Make Virtual Enviroment
virtual enviroemnt example

# Creates the virtual env
mkvirtualenv {Enviroment Name}

# Installs dependencies 
pip install -r requirements.txt

# Update list of dependencies
pip freeze > requirements.txt

# Set up Enviroment Variables
API KEYS
<ins>virtual environment wrapper</ins> 
Go to .../virtualenvs/{Name of virtual env}/bin/postactivate
append these lines to the postactivate file
export GOOGLE_MAPS_API_KEY='{API KEY}'
export YELP_API_KEY='{API KEY}'

Got to .../virtualenvs/{Name of virtual env}/bin/postdeactivate
append these lines to the postdeactivate file
unset GOOGLE_MAPS_API_KEY
unset YELP_API_KEY
