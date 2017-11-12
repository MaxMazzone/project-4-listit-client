<h1> List-it </h1>
<h4>
List-it is an apartment listing app which allows users to browse listings posted by other users as well as posting their own listing with photos.
</h4>

<img src='https://i.imgur.com/L7ujqrX.png'>


The API can be found here:
https://github.com/stgeorge3/project-4-listit-back

https://possessed-moonlight-45582.herokuapp.com/

The Client can be found here:
https://github.com/stgeorge3/project-4-listit-client

https://stgeorge3.github.io/project-4-listit-client/

<h2>
Technologies used include:
</h2>
<p>
Ember.js, Ruby on Rails, Imgur 3rd party api, bootstrap, CSS, HTML.
</p>

<h2>
Development:
</h2>

<p>
In future iterations of the project, I will be increasing the usability and visibility of photos. I will also increase the options for listing criteria and search.
<br>
Planning started with wireframing and ERDs. The back end API was mostly completed before starting the client so most end-points could be tested. The app originally did not support image upload and implementing this proved to be complex as ruby on rails and ember are both very opinionated. Many of the addons available for image upload do not neccessarily  communicate well. Imgur api turned out to be flexible and straight forward. The client parses the base64 data from the photo and sends the request to Imgur where it is hosted online. imgur returns the url to the client which then sends that to the server to be stored.
</p>
<h2>
User Stories:
</h2>
<ul>
  <li>As a user, I want to be able to see apartment listings</li>

  <li>As a user, I want to post an apartment listing</li>

  <li>As a user, I want to view and post photos</li>
</ul>
<h2>
Wire-frame:
</h2>
<img src="https://lh3.googleusercontent.com/-L0AxpwfXKMQ/WgiL1bbNKgI/AAAAAAAAEjg/bv9x-pIzYUAb2D0d6BKbvhXBfJ0lvA_PQCL0BGAYYCw/h2048/4727459728845018824%253Faccount_id%253D0">
<img src="https://lh3.googleusercontent.com/-IlN8H9DCEBE/WgiINZTDczI/AAAAAAAAEjM/qKBkIyNT0kAT5Gcbl7VCVbhNiNEZSfoYwCL0BGAYYCw/h2048/4276654311124077519%253Faccount_id%253D0">
