import Handlerbar from 'handlebars';

let componentId = 10000;
let map = new WeakMap();
let count = 0;

let defaultConfig = {
    template: '',
    replaceTemplate:[],
    data: {},
    events: {},
    actions: {},
    /**
     * {
     *      event: 'click',
     *      selector: '.name',
     *      callback: function(){}
     * }
     */
    binds: [],
    beforeRender: null,
    afterRender: null,
    firstAfterRender: null,
    beforeDestory: null,
    firstAfterRenderRunned: false
}

class Component {
    constructor(config, data, events) {
        $.extend(true, this, defaultConfig, config, {data: data||{}, events: events||{}})
        let that = this;
        function scan(obj) {
            for(let name in obj) {
                let item = obj[name];
                if (_.isFunction(item)) {
                    obj[name] = item.bind(that);
                } else if (_.isPlainObject(item) || _.isArray(item)) {
                    scan(item);
                }
            }
        }
        scan(this);
        this.subComponents = [];
        this.componentId = componentId++;
        count ++;
    }

    render(el) {
        if (el.length === 0) {
            // debugger;
            console.error('component: el必须是存在于dom内的节点');
            console.dir(this);
            return;
        }
        this.el = el;
        this.el.attr('component', this.componentId);
        map.set(this.el.get(0), this);
        return this.reload();
    }

    /**
     * 组件渲染
     * @returns {Component}
     */
    reload() {
        this.destroyChildren();
        this.beforeRender && this.beforeRender();
        let compiler = Handlerbar.compile(this.template);
        let html = compiler(this.data);
        this.el.html(html);
        if(this.replaceTemplate.length !=0){
            for(let t of this.replaceTemplate){
                this.el.find(t.selector).replaceWith(t.template);
            }
        }
        if (this.firstAfterRenderRunned === false) {
            this.bindEvents();
            this.firstAfterRender && this.firstAfterRender();
            this.firstAfterRenderRunned = true;
        }
        this.afterRender && this.afterRender();
        return this;
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        if (this.binds && this.binds.length) {
            let that = this;
            this.binds.forEach((item) => {
                this.el.on(item.event, item.selector, function (event) {
                    return item.callback.call(that, this, event);
                });
            })
        }
    }

    cancelEvents() {
        this.el.off();
    }

    trigger(eventName, params) {
        this.events[eventName] && this.events[eventName](params);
        return this;
    }

    addEvent(eventName, func) {
        this.events[eventName] = func.bind(this);
        return this;
    }

    setData(key, value) {
        this.data[key] = value;
    }

    append(component, container, tagName = 'div') {
        let el = $(`<${tagName}>`).appendTo(container);
        component.render(el);
        this.subComponents.push(component);
        return this;
    }

    appendTo(container, tagName = 'div', sort = '') {
        let el = $(`<${tagName}>`);
        if (sort === 'desc') {
            el.prependTo(container);
        } else {
            el.appendTo(container);
        }
        this.render(el);
        return this;
    }

    destroyChildren(container) {
        if (!container) {
            container = this.el;
        }

        let subs = Array.from(container.find('[component]'));
        subs = subs.sort((prev, current) => {
            let c1 = parseInt($(prev).attr('component'));
            let c2 = parseInt($(current).attr('component'));
            return c1 < c2;
        });

        subs.forEach((element) => {
            let component = map.get(element);
            if (component) {
                component._destroy();
            }
        });

        return this;

    }

    destroySelf() {
        this.destroyChildren();
        return this._destroy();
    }

    _destroy() {

        count--;

        this.beforeDestory && this.beforeDestory();
        if (this.el) {
            this.el.off();
            this.el.remove();
        }
        for (let name in this) {
            this[name] = null;
        }
        return this;
    }

    findBrothers() {
        let doms = this.el.parent().find('> [component]');
        let coms = [];
        let that = this;
        doms.each(function () {
            let component = map.get(this);
            if (component !== that) {
                coms.push(component);
            }
        });
        return coms;
    }

    findAllChildren() {
        let subs = Array.from(this.el.find('[component]'));
        let res = subs.map((element) => {
            return map.get(element);
        });
        return res;
    }

    showLoading(dom){
        if (this.loadingTarget) {
            return;
        }
        if (_.isUndefined(dom)) {
            this.loadingTarget = this.el;
        } else {
            this.loadingTarget = dom;
        }
        let width = this.loadingTarget.width();
        let height = this.loadingTarget.height();
        // let size = Math.min(Math.min(width, height)*0.15,50);
        let size = 50;

        this.loadingTarget.addClass('component-loading-effect');
        this.loadingTarget.children().addClass('component-filter-blur');

        this.loadingOverlay = $('<div class="component-loading-cover">').appendTo(this.loadingTarget);
        let loadingHtml = `<div class='component-loading-box'><div class ="dot1"></div><div class ="dot2"></div><div class ="dot3"></div><div class ="dot4"></div><div class ="dot5"></div></div>`;
        this.loadingEffectBox = $(loadingHtml).appendTo(this.loadingTarget);

        this.loadingEffectBox.css({
            "width":size,
            "height":size,
            marginLeft: -size/2,
            marginTop: -size/2
        });
    }

    hideLoading(){
        // this.loadingOverlay.fadeOut();
        // this.loadingEffectBox.fadeOut(() => {
        //     this.loadingOverlay.remove();
        //     this.loadingEffectBox.remove();
        //     this.loadingTarget.removeClass('component-loading-effect');
        //     this.loadingTarget.children().removeClass('component-filter-blur');
        //     this.loadingTarget = null;
        // });
        if (this.loadingOverlay) {
            this.loadingOverlay.remove();
        }
        if (this.loadingEffectBox) {
            this.loadingEffectBox.remove();
        }
        if (this.loadingTarget) {
            this.loadingTarget.removeClass('component-loading-effect');
            this.loadingTarget.children().removeClass('component-filter-blur');
            this.loadingTarget = null;
        }
    }

    disable(){
        this.el.addClass('relative');
        this.disableEffectBox = $('<div class="component-disable-cover">').appendTo(this.el);
    }

    enable(){
        this.disableEffectBox.remove();
        this.el.removeClass('relative');
    }

    /**
     * binds由于是数组，无法像对象一想去覆盖，所以专门写个方法去合并数组
     * @param newBinds
     * @param array2
     */
    static mergeBinds(newBinds, oldBinds){
        if (newBinds && newBinds.length) {
            if (oldBinds && oldBinds.length) {
                return _.unionWith(newBinds, oldBinds, (p1, p2) => {
                    return p1.event === p2.event && p1.selector === p2.selector;
                });
            } else {
                return newBinds;
            }
        } else {
            return oldBinds;
        }
    }
    
    /**
     * 继承写法2.0
     * @param config
     * @returns {newclazz} 返回一个全新的class
     */
    static extend(config){
        let self = this;
        class newclazz extends self {
            constructor(extendConfig){
                function addToLeaf(obj) {
                    if (obj._super) {
                        addToLeaf(obj._super);
                    } else {
                        obj._super = _super;
                    }
                }
                let _super = $.extend(true, {}, self.config);
                let selfCBinds = self.config.binds;
                let cBinds = config.binds;
                let extendCBinds;
                let distBinds = Component.mergeBinds(cBinds, selfCBinds);
                if (extendConfig) {
                    extendCBinds = extendConfig.binds;
                    distBinds = Component.mergeBinds(extendCBinds, distBinds);
                }
                let newConfig = $.extend(true, {}, self.config, config, extendConfig, {binds: distBinds});
                addToLeaf(newConfig);
                super(newConfig);
            }
        }
        newclazz.config = config;
        return newclazz;
    }

}

Component.config = defaultConfig;

export default Component;