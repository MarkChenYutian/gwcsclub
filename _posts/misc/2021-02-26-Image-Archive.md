---
layout: page
title: 照片墙
tags: Page Miscellaneous
useTOC: false
---
<style>
.row { display: flex; flex-wrap: wrap; padding: 0 4px; }

/* Create four equal columns that sits next to each other */
.column { flex: 25%; max-width: 25%; padding: 0 4px; }

.column img { margin: 1rem; vertical-align: middle; width: 100%; }

/* Responsive layout - makes a two column-layout instead of four columns */
@media screen and (max-width: 800px) {
  .column { flex: 50%; max-width: 50%; }
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column { flex: 100%; max-width: 100%;}
}
</style>

<!-- This Page is generated automatically using Liquid Template, the path of images is defined in _data/image_flow.json -->

{% include fn/image_flow.html year="2021" %}

{% include fn/image_flow.html year="2020" %}

{% include fn/image_flow.html year="2019" %}

{% include fn/image_flow.html year="2018" %}
