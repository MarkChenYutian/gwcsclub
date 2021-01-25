---
layout: default
title: {{ site.name }}
---

<center><h1>Main Page</h1></center>

<div class="card-box">
  <div class="card">
    <img src="{{ site.baseurl }}/assets/aboutUs.svg" height="50%" width="50%"/>
    <p><strong>About Us</strong></p>
  </div>
  <div class="card">
    <img src="{{ site.baseurl }}/assets/toBeginners.svg" height="50%" width="50%"/>
    <p><strong>For Beginners</strong></p>
  </div>
  <div class="card">
    <img src="{{ site.baseurl }}/assets/competition.svg" height="50%" width="50%"/>
    <p><strong>Competition</strong></p>
  </div>
  <div class="card">
    <img src="{{ site.baseurl }}/assets/bookSharing.svg" height="50%" width="50%"/>
    <p><strong>Book Sharing</strong></p>
  </div>
  <div class="card">
    <img src="{{ site.baseurl }}/assets/notes.svg" height="50%" width="50%"/>
    <p><strong>Notes</strong></p>
  </div>
  <div class="card">
    <img src="{{ site.baseurl }}/assets/meetTA.svg" height="50%" width="50%"/>
    <p><strong>Schedule Meeting</strong></p>
  </div>
  <div class="card">
    <img src="{{ site.baseurl }}/assets/column.svg" height="50%" width="50%"/>
    <p><strong>Posts</strong></p>
  </div>

  <div class="card">
    <img src="{{ site.baseurl }}/assets/more.svg" height="50%" width="50%"/>
    <p><strong>More</strong></p>
  </div>
</div>

---

## Posts

<ul class="posts">
    {% for post in site.posts %}
      <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>