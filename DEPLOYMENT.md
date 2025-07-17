# 在 Windows 上部署 Kerrymed 网站

本文档将指导您如何在 Windows 环境中部署 Kerrymed 网站。

## 1. 环境准备

*   **安装 Python**: 从 [Python 官网](https://www.python.org/downloads/) 下载并安装最新版本的 Python。在安装过程中，请确保勾选 "Add Python to PATH" 选项。
*   **安装 pip**: pip 是 Python 的包管理器，通常会随 Python 一起安装。您可以在命令提示符或 PowerShell 中运行 `pip --version` 来验证是否安装成功。

## 2. 安装依赖

1.  打开命令提示符或 PowerShell，并进入项目的 `backend` 目录：
    ```bash
    cd path/to/kerrymed/backend
    ```

2.  安装所需的 Python 包：
    ```bash
    pip install Flask Flask-SQLAlchemy Flask-Cors
    ```

## 3. 运行后端服务

1.  在 `backend` 目录下，运行以下命令来启动 Flask 后端服务：
    ```bash
    python app.py
    ```
    该命令将首先创建数据库和表（如果它们尚不存在），然后启动后端服务。服务默认会在 `http://localhost:5000` 上运行。

## 4. 访问网站

1.  在浏览器中打开 `kerrymed/frontend` 目录下的 `index.html` 文件，即可访问网站首页。

    **注意**: 为了使网站能够与后端 API 进行通信，您需要通过一个 Web 服务器来访问前端文件，而不是直接在浏览器中打开本地文件。一个简单的方法是使用 Python 内置的 HTTP 服务器：

    1.  打开一个新的命令提示符或 PowerShell 窗口，并进入 `frontend` 目录：
        ```bash
        cd path/to/kerrymed/frontend
        ```

    2.  启动一个简单的 HTTP 服务器：
        ```bash
        python -m http.server
        ```

    3.  现在，您可以在浏览器中访问 `http://localhost:8000` 来查看网站。

## 6. 后台管理

1.  访问 `http://localhost:8000/admin.html` 来进入后台管理页面。在这里，您可以添加、编辑或删除产品。
