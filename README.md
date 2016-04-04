# image-search-abstraction-layer

Project uploaded to heroku at http://qxx.herokuapp.com/.

This microservices uses the Google Search API to receive 
image search information in text form. Given a search term, 
it returns an array of result objects, containing the image 
url, alt text, thumbnail url, and context url. Results can 
be paged through by adding an offset. Searches are stored 
in a recent searches object, so that others can see them 
upon request.
