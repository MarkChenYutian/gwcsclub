---
layout: default
title: {{ site.name }}
---

<center><h1>Main Page</h1></center>

<div class="card-box">
  <div class="card">
    <img src="{{ site.baseurl }}/assets/aboutUs.svg" height="50%" width="50%"/>
    <p>About Us</p>
  </div>
  <div class="card">
    <img src="{{ site.baseurl }}/assets/competition.svg" height="50%" width="50%"/>
    <p>Competition</p>
  </div>
  <div class="card">
    <img src="{{ site.baseurl }}/assets/bookSharing.svg" height="50%" width="50%"/>
    <p>Book Sharing</p>
  </div>
  <div class="card">
    <img src="{{ site.baseurl }}/assets/notes.svg" height="50%" width="50%"/>
    <p>Notes</p>
  </div>
  <div class="card">
    <img src="{{ site.baseurl }}/assets/meetTA.svg" height="50%" width="50%"/>
    <p>Schedule Meeting</p>
  </div>
  <div class="card">
    <img src="{{ site.baseurl }}/assets/column.svg" height="50%" width="50%"/>
    <p>Posts</p>
  </div>
  <div class="card">
    <img src="{{ site.baseurl }}/assets/link.svg" height="50%" width="50%"/>
    <p>Link to Other's Blogs</p>
  </div>
  <div class="card">
    <img src="{{ site.baseurl }}/assets/more.svg" height="50%" width="50%"/>
    <p>More ...</p>
  </div>
</div>

<ul class="posts">
    {% for post in site.posts %}
      <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>