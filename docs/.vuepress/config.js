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
            text: "构建工具",
            items: [{ text: "webpack", link: "/notebook/buildTools/webpack" }],
          },
          {
            text: "操作数据",
            items: [{ text: "数组操作", link: "/notebook/js/数组操作" }],
          },
          {
            text: "数据请求",
            items: [{ text: "axios", link: "/notebook/dataRequest/axios" }],
          },
          {
            text: "布局",
            items: [
              { text: "flex布局", link: "/notebook/layout/flex布局" },
              { text: "Grid布局", link: "/notebook/layout/Grid布局" },
            ],
          },
        ],
      },
      {
        text: "JavaScript",
        items: [
          { text: "js进阶1", link: "/notebook/js/js进阶/JS进阶1" },
          { text: "js进阶2", link: "/notebook/js/js进阶/JS进阶2" },
        ],
      },
      {
        text: "Vue",
        items: [
          {
            text: "Vue2",
            items: [
              // { text: "Vue属性", link: "/notebook/frontFrame/Vue2/Vue属性" },
              { text: "Vue指令", link: "/notebook/Vue/Vue2/Vue指令" },
              // { text: "Vue组件", link: "/notebook/frontFrame/Vue2/Vue组件化" },
              { text: "VueRouter", link: "/notebook/Vue/Vue2/Vue-router" },
            ],
          },
          {
            text: "Vue3",
            items: [{ text: "Vue3基本使用", link: "/notebook/Vue/Vue3/Vue3" }],
          },
        ],
      },
      {
        text: "React",
        items: [
          {
            text: "基础使用",
            link: "/notebook/React/react-base",
          },
          {
            text: "react-redux",
            link: "/notebook/React/react-redux",
          },
          {
            text: "react-hooks",
            link: "/notebook/React/react-hooks",
          },
          {
            text: "项目搭建",
            link: "/notebook/React/project-build",
          },
        ],
      },
      {
        text: "探索原理",
        items: [
          {
            text: "javaScript",
            link: "/notebook/learnPrinciple/探索原理",
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
      // { text: "My Github", link: "https://github.com/liupziio/Pz-blog" },
    ],
    sidebar: "auto", // 侧边栏配置
    sidebarDepth: 2, // 侧边栏显示2级
  },
};
