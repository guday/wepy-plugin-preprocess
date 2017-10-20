import path from 'path';
var pp = require("preprocess");

export default class {

    constructor(c = {}) {
        const def = {
            filter: /\w$/,
            config: {
            }
        };

        if (Array.isArray(c)) {
            this.setting = c.map(s => Object.assign({}, def, s));
            return;
        }

        this.setting = Object.assign({}, def, c);
    }
    apply (op) {

        let setting = this.setting;

        let settings = [];

        if (setting instanceof Array) {
            settings = settings.concat(setting);
        } else if (setting instanceof Object && !setting.filter) {
            for (let key in setting) {
                let value = setting[key];
                if (value.filter) {
                    settings.push(value);
                }
            }
        } else if (setting instanceof Object && setting.filter) {
            settings.push(setting);
        }

        settings.forEach((setting) => {
            if (!(setting.filter instanceof RegExp)) {
                //
                console.error(`要求filter配置成一个正则表达式: ${setting.filter}`)
            } else if (op.code !== null && setting.filter.test(op.file)) {
                op.output && op.output({
                    action: '变更',
                    file: op.file
                });

                //执行

                let extension = path.extname(op.file);
                let context = setting.context || {};
                extension = extension[0] === "." ? extension.substr(1) : extension;

                op.code = pp.preprocess(op.code, context, extension);
            }
        });

        op.next();
    }
}
