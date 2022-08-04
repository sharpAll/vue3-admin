<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-dialog-provider
      ><n-message-provider><router-view /></n-message-provider
    ></n-dialog-provider>
  </n-config-provider>
</template>

<script>
export default {
  name: "App",
  setup() {
    function addLight(color, amount) {
      const cc = parseInt(color, 16) + amount;
      const c = cc > 255 ? 255 : cc;
      return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
    }
    function lighten(color, amount) {
      color =
        color.indexOf("#") >= 0 ? color.substring(1, color.length) : color;
      amount = Math.trunc((255 * amount) / 100);
      return `#${addLight(color.substring(0, 2), amount)}${addLight(
        color.substring(2, 4),
        amount
      )}${addLight(color.substring(4, 6), amount)}`;
    }
    const themeOverrides = {
      common: {
        primaryColor: "#1F656C",
        primaryColorHover: lighten("#1F656C", 6),
        primaryColorPressed: lighten("#1F656C", 6),
        infoColor: "#1F656C",
        infoColorHover: lighten("#1F656C", 6),
        infoColorPressed: lighten("#1F656C", 6),
        successColor: "#1F656C",
        successColorHover: lighten("#1F656C", 6),
        successColorPressed: lighten("#1F656C", 6),
      },
    };
    return {
      themeOverrides,
    };
  },
};
</script>

<style>
@import "./assets/css/main.scss";
</style>
