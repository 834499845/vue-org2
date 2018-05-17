<template>
    <div class="wf-panel wf-settingpanel">
        <div class="wf-panel-tab">
            <div href="javascript:;" @click="clickTab" aaaaa='aaaaaa' data-tabname="component" class="tabitem"
               v-bind:class="[component?'current':'']" style="color: #000000;">控件设置</div>
            <div href="javascript:;" @click="clickTab" data-tabname="form" class="tabitem "
               v-bind:class="[component?'':'current']" style="color: #000000;">表单设置</div>
        </div>
        <formsetting v-show="!component"></formsetting>
        <widgetsettings v-show="component"></widgetsettings>
    </div>

</template>
<script>
    import formsetting from "./formsetting"
    import widgetsettings from "./widgetsettings"
    export default{
        name: 'setting',
        data(){
            return {
                component: false
            }
        },
        components: {
            formsetting,
            widgetsettings
        },
        methods: {
            clickTab: function (e) {
                if (e.currentTarget.getAttribute('data-tabName') === 'component') {
                    this.component = true
                } else {
                    this.component = false
                }
            }
        },
        created: function () {
            let self = this
            drag.$on("changeTab", function (bool) {
                self.component = bool
            })
           /* drag.$on("selectComponent", function (obj) {
                self.supportSetting = Object.assign({}, self.supportSetting, obj)
            })*/
        }
    }
</script>
