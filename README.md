# Kerrymed 网站

这是一个为 Kerrymed 公司设计的网站，主营 CT 球管和 CT 配件业务。

## 功能

*   **产品展示**: 网站可以展示 CT 球管和 CT 配件两大分类的产品。
*   **产品搜索**: 用户可以根据产品名称搜索产品。
*   **后台管理**: 提供一个简单的后台界面，用于上架、更新和移除商品。

## 技术栈

*   **前端**: HTML, CSS, JavaScript
*   **后端**: Python (Flask)
*   **数据库**: SQLite

## 项目结构

```
/kerrymed
├── /backend
│   ├── app.py          # Flask 应用入口
│   ├── database.py     # 数据库初始化脚本
│   ├── models.py       # SQLAlchemy 数据模型
│   ├── routes.py       # API 路由
│   └── kerrymed.db     # SQLite 数据库文件
└── /frontend
    ├── index.html      # 网站首页
    ├── products.html   # 产品列表页
    ├── product-detail.html # 产品详情页
    ├── admin.html      # 后台管理页
    ├── /css
    │   └── style.css   # 样式表
    └── /js
        └── app.js      # JavaScript 逻辑
```
