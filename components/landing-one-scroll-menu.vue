<template>
  <div class="on-site-menu">
    <ul>
      <li>
        <NuxtLink :to="{ hash: '#start' }" :external="true">Start</NuxtLink>
      </li>

      <li>
        <NuxtLink :to="{ hash: '#bisher' }" :external="true">
          Was bisher geschah
        </NuxtLink>
      </li>

      <li>
        <NuxtLink :to="{ hash: '#ziele' }" :external="true">
          Unsere Ziele
        </NuxtLink>
      </li>

      <li>
        <NuxtLink :to="{ hash: '#gemeinschaft' }" :external="true">
          EinHaus Gemeinschaft
        </NuxtLink>
      </li>

      <li>
        <NuxtLink :to="{ hash: '#mehr' }" :external="true">
          Mehr als ein Wohnhaus
        </NuxtLink>
      </li>

      <li>
        <NuxtLink :to="{ hash: '#unterstutzung' }" :external="true">
          Unterstütze unser Projekt
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.on-site-menu {
  display: none;
  position: fixed;
  z-index: 1020;
  margin-left: 1rem;

  left: 0;
  top: 50%;
  transform: translateY(-60%);

  @media screen and (min-width: $_md) {
    display: block;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    background-color: rgba(128, 128, 128, 0.7);
    border-radius: 6px;
    height: 50px;
    width: 200px;
    padding: 0;

    margin: 4px 0;

    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }

  ul li a,
  ul li a:visited {
    display: block;
    color: var(--main-text-color-light);

    font-size: 0.9rem;
    font-weight: 500;
    text-decoration: none;
    line-height: 1rem;

    display: flex;
    align-content: center;
    justify-content: left;
    padding-top: 0.9rem;
    padding-right: 0.9rem;
    padding-bottom: 0.9rem;
    padding-left: 1.4rem;
  }

  ul li:hover {
    background-color: white;
  }

  ul li a:hover {
    color: var(--main-text-color-dark);
  }
}
</style>
