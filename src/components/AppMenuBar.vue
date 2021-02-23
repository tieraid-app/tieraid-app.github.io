<template>
  <Menubar :model="menuBarItems">
    <template
      #start
    >
      <div class="layout-logo">
        {{ company }}
      </div>
    </template>
    <template #end>
      <Avatar
        shape="circle"
        size="medium"
      >
        <img
          src="@/assets/images/logo_dogo.png"
          alt=""
        >
      </Avatar>
    </template>
  </Menubar>
</template>