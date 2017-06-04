# 常用的git命令

    git init
        初始化本地git仓库--创建新仓库
    git config --global user.name "slj"
        配置用户名
    git config --global user.email "slj@126.com"
        配置邮件

    git clone
        clone远程仓库

    git status
        查看当前版本状态--是否修改
    git add index.html
        添加文件
    git commit -m "备注内容"

    git diff xxx.txt
        查看该文件的修改
    git log
        显示从最近到最远的提交【commit】日志
    git log --pretty=oneline
        commit id
        sha1计算出的数字，十六进制表示
    


# 创建版本库 repository

    1.创建一个空目录
        a.mkdir test
        b.cd test
        c.pwd 用于显示当前目录

    2.把这个目录变成Git可以管理的仓库
        git init

# 把文件添加到版本库

    版本控制系统，只能跟踪文本文件的改动



# git的分支管理

    http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013745374151782eb658c5a5ca454eaa451661275886c6000


# 版本回退

    1.git log
        查看commit 历史提交记录
    2.当前版本  HEAD
      上一个版本 HEAD^
      上上一个版本 HEAD^^
      HEAD~100

    3. git reset --hard HEAD^
        回滚到上一个版本

    4. git reset --hard commitID
        恢复最新的版本
    5. git reflog

    总结：
        HEAD 指向的版本就是当前的版本
        使用 git reset --hard commitId 在各个版本之间切换
        版本切换前，使用 git log 查看提交历史
        要恢复最新的版本，使用  git reflog查看命令历史，以便确定要回到未来的哪个版本

# 创建 .gitignore 忽略文件
     1.对于无需纳入git管理的文件，不需要出现在未跟踪文件列表
     2.通常都是一些自动生成的文件。日志或者IDE生成的文件
     3.配置说明
        a. 以斜杠“/”开头表示目录
        b.以*通配多个字符
        c.以？通配单个字符
        d.以[]包含单个字符的匹配列表
        e.以!表示不忽略匹配到的文件或目录
        比如：
            .[ab] 任何以a和b结尾的文件
            .js 以js结尾的文件
            !index.js 除了index.js外，都可以忽略
            \!index.js



# 工作区和暂存区

    Working Directory 工作区
        本地的工作目录
    Repository  版本库
        工作区内的隐藏目录 .git,这个不算工作区，是Git的版本库
        Git版本库里面，包括
        1. stage[index]  暂存区
        2. Git自动创建的分支 master
        3.指向master的一个指针  HEAD


# git工作流

    0.git status 查看状态
    1.git init
    2.git add xxx.html 或者 git add -A
        把文件添加到暂存区
    3.git commit -m "备注信息"
        把暂存区中的内容，提交到当前分支
    4.git push origin master
        提交到 github上 master分支
    5.发起一个 pull request
    6.解决冲突 合并代码