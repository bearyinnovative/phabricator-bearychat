# Phabricator BearyChat MiddleWare

这一个小服务可以将Phabricator中活动以消息形式推送到BearyChat的channel中

## Requirements

- Node.js
- Phabricator的admin权限以及一个Conduit API Token
- 一个BearyChat的incoming机器人

## Setup instructions

1. clone这个repo然后运行 `npm install`
2. 依赖装完之后需要在BearyChat上建立一个incoming机器人
3. 进入Phabricator的控制台生成一个`Conduit API Token`, 生成token的控制台链接为`http://$your-phabricator-host/settings/panel/apitokens/`
4. 复制config路径下的`production.json.example`到`production.json`, 将`bearychat.url`的参数值设置为刚刚创建的`Incoming机器人`的webhook链接, 将`phabricator.api`设置为Phabricator服务的host, 将`phabricator.token`设置为在上一步生成好的token
5. 启动服务 `NODE_ENV=production node server.js`
6. 设置phabricator的webhook, 进入phabricator根路径, 然后运行`./bin/config set feed.http-hooks '["http://your-phabricator-bearychat-middleware-host"]'`