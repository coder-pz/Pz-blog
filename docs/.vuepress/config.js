module.exports = {
  title: "Pz's blog",
  description: "Pz's blog",
  head: [["link", { rel: "icon", href: "/images/head_photo.jpg" }]],
  base: "/Pz-blog/", // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false, // 代码块显示行号
  },
  themeConfig: {
    nav: [
      {
        text: "前端",
        items: [
          {
            text: "布局",
            items: [
              { text: "flex布局", link: "/notebook/布局/flex布局" },
              { text: "Grid布局", link: "/notebook/布局/Grid布局" },
            ],
          },
          {
            text: "javaScript",
            items: [
              { text: "js常用", link: "/notebook/js/js笔记" },
              { text: "数组操作", link: "/notebook/js/数组操作" },
            ],
          },
          {
            text: "构建工具",
            items: [{ text: "webpack", link: "/notebook/构建/webpack" }],
          },
        ],
      },
      {
        text: "前端框架",
        items: [
          {
            text: "Vue2",
            items: [
              { text: "Vue属性", link: "/notebook/前端框架/Vue2/Vue属性" },
              { text: "Vue指令", link: "/notebook/前端框架/Vue2/Vue指令" },
              { text: "Vue指令", link: "/notebook/前端框架/Vue2/Vue组件化" },
              { text: "VueRouter", link: "/notebook/前端框架/Vue2/Vue-router" },
            ],
          },
          {
            text: "Vue3",
            items: [{ text: "Vue3基本使用", link: "/notebook/前端框架/Vue3/Vue3" }],
          },
        ],
      },

      {
        text: "代码管理",
        items: [
          {
            text: "git",
            link: "/notebook/git/Git",
          },
        ],
      },
      { text: "My Github", link: "https://github.com/liupziio/Pz-blog" },
    ],
    sidebar: "auto", // 侧边栏配置
    sidebarDepth: 2, // 侧边栏显示2级
  },
};
